import {
  Container,
  Card,
  Text,
  Button,
  Select,
  Menu,
  ActionIcon,
} from "@mantine/core";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ClimbingBoxLoader } from "react-spinners";
import { getHistory, getOneUser } from "../services/users";
import Cookies from "js-cookie";
import useStore from "../store";
import {
  addToFavoriteRevisionTool,
  addToFavoriteSession,
  addToFavoriteTool,
} from "../services/revision";
import ModalLoading from "../components/ModalLoading";

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalRevision: false,
      loading: true,
      redirect: false,
      data: [],
      displayData: [],
      filter: "all",
      loadingMenu: false,
    };
  }

  async componentDidMount() {
    try {
      if (
        Cookies.get("token") &&
        Cookies.get("userData") &&
        Cookies.get("id")
      ) {
        const data = await getHistory(Cookies.get("token"));
        if (data.success) {
          this.props.store.setUserData(data.user);
          this.props.store.setCredit(data.user.credits);
          this.setState({
            loading: false,
            data: data.data,
            displayData: data.data,
          });
        } else if (data.invalidToken) {
          Cookies.remove("token");
          Cookies.remove("userData");
          Cookies.remove("id");
          this.props.store.setToken("");
          this.props.store.setUserData({});
          this.setState({ redirect: true });
        } else {
          console.log(data);
          window.alert("Une erreur inconnu a eu lieu");
        }
      } else {
        Cookies.remove("token");
        Cookies.remove("userData");
        Cookies.remove("id");
        this.props.store.setToken("");
        this.props.store.setUserData({});
        this.setState({ redirect: true });
      }
    } catch (error) {
      console.log(error);
      window.alert("Une erreur inconnu a eu lieu");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.redirect !== this.state.redirect &&
      this.state.redirect === true
    ) {
      this.props.navigation.navigate("/login");
    }
  }

  _favorite = (id, type) => {
    this.setState({ loadingMenu: true }, async () => {
      let data = null;
      switch (type) {
        case "tool":
          data = await addToFavoriteTool(id, Cookies.get("token"));
          break;
        case "session":
          data = await addToFavoriteSession(id, Cookies.get("token"));
          break;
        case "revisionTool":
          data = await addToFavoriteRevisionTool(id, Cookies.get("token"));
          break;
      }
      if (data.success) {
        const data2 = await getHistory(Cookies.get("token"));
        if (data2.success) {
          this.props.store.setUserData(data2.user);
          this.props.store.setCredit(data2.user.credits);
          this.setState({
            loadingMenu: false,
            data: data2.data,
            displayData:
              this.state.filter === "all"
                ? data2.data
                : data2.data.filter((el) => el.type === this.state.filter),
          });
        } else if (data2.invalidToken) {
          Cookies.remove("token");
          Cookies.remove("userData");
          Cookies.remove("id");
          this.props.store.setToken("");
          this.props.store.setUserData({});
          this.setState({ redirect: true });
        } else {
          console.log(data2);
          window.alert("Une erreur inconnu a eu lieu");
        }
      } else {
        this.setState({ loadingMenu: false });
        window.alert(
          "Une erreur inconnu a eu lieu veuillez nous contacter si le problème persiste"
        );
      }
    });
  };

  _renderElements = () => {
    let arrElements = [];
    for (let index in this.state.displayData) {
      const el = this.state.displayData[index];
      if (el.type === "tool") {
        arrElements.push(
          <>
            <Card radius={"md"}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2 style={{ color: "tomato", marginBottom: 0, marginTop: 0 }}>
                  REDACTION
                </h2>
                <ActionIcon onClick={() => this._favorite(el.id, el.type)}>
                  <i
                    style={{ color: el.favorite ? "tomato" : "white" }}
                    className={`${
                      el.favorite ? "fa-solid" : "fa-regular"
                    } fa-heart`}
                  ></i>
                </ActionIcon>
              </div>
              <h3 style={{ color: "gray", marginTop: 0 }}>{el.name}</h3>
              <Text fw={"bolder"}>Entrée:</Text>
              <Text fw={"bold"}>{el.input}</Text>
              <br />
              <Text fw={"bolder"}>Sortie:</Text>
              <div
                dangerouslySetInnerHTML={{
                  __html: el.output.replace(/\n/g, "<br />"),
                }}
              ></div>
            </Card>
            <br />
          </>
        );
      } else if (el.type === "session") {
        arrElements.push(
          <>
            <Card radius={"md"}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2 style={{ color: "#007bff", marginBottom: 0, marginTop: 0 }}>
                  SESSION DE REVISION
                </h2>
                <ActionIcon onClick={() => this._favorite(el.id, el.type)}>
                  <i
                    style={{ color: el.favorite ? "tomato" : "white" }}
                    className={`${
                      el.favorite ? "fa-solid" : "fa-regular"
                    } fa-heart`}
                  ></i>
                </ActionIcon>
              </div>
              <h3 style={{ color: "white", marginTop: 0, marginBottom: 0 }}>
                {el.subject}
              </h3>
              <Button
                component={Link}
                to={`/chat/${el.id}`}
                variant="light"
                color="blue"
                mt="md"
                radius="md"
              >
                Voir &nbsp;&nbsp;<i className="fa-solid fa-arrow-right"></i>
              </Button>
            </Card>
            <br />
          </>
        );
      } else if (el.type === "revisionTool") {
        arrElements.push(
          <>
            <Card radius={"md"}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2 style={{ color: "#ffc107", marginBottom: 0, marginTop: 0 }}>
                  OUTIL DE REVISION
                </h2>
                <ActionIcon onClick={() => this._favorite(el.id, el.type)}>
                  <i
                    style={{ color: el.favorite ? "tomato" : "white" }}
                    className={`${
                      el.favorite ? "fa-solid" : "fa-regular"
                    } fa-heart`}
                  ></i>
                </ActionIcon>
              </div>
              <h3 style={{ color: "white", marginTop: 0 }}>{el.name}</h3>
              <Text fw={"bold"}>{el.input}</Text>
              <Button
                component={Link}
                to={`/artefacts/${btoa(el.id.toString())}`}
                variant="light"
                color="blue"
                mt="md"
                radius="md"
              >
                Voir &nbsp;&nbsp;<i className="fa-solid fa-arrow-right"></i>
              </Button>
            </Card>
            <br />
          </>
        );
      }
    }
    return arrElements;
  };

  _handleFilterChange = (value) => {
    this.setState({ filter: value }, () => {
      if (value !== "all") {
        this.setState({
          displayData: this.state.data.filter((el) => el.type === value),
        });
      } else {
        this.setState({ displayData: this.state.data });
      }
    });
  };

  render() {
    if (this.state.loading) {
      return (
        <>
          <Navbar />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "10%",
            }}
          >
            <div style={{ marginTop: "10%" }}>
              <ClimbingBoxLoader size={"200%"} color="#8cb9de" />
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <Navbar />
          <Container style={{ marginTop: 0 }} mt={0}>
            <h1 style={{ marginBottom: 0 }}>Historique d'utilisation</h1>
            <Select
              placeholder="Filtre"
              data={[
                { label: "Tout", value: "all" },
                {
                  label: "Session de révision",
                  value: "session",
                },
                {
                  label: "Outil de révision",
                  value: "revisionTool",
                },
                {
                  label: "Rédaction",
                  value: "tool",
                },
              ]}
              value={this.state.filter}
              onChange={this._handleFilterChange}
            />
            <br />
            {this._renderElements()}
          </Container>
          <ModalLoading show={this.state.loadingMenu} />
        </>
      );
    }
  }
}

const withStoreAndNavigate = (BaseComponent) => (props) => {
  const store = useStore();
  const navigate = useNavigate();
  return (
    <BaseComponent
      {...props}
      store={store}
      navigation={{ navigate: navigate }}
    />
  );
};

export default withStoreAndNavigate(History);
