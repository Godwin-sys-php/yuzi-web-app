import {
  Container,
  Card,
  Text,
  Grid,
  Button,
  SimpleGrid,
  MediaQuery,
  Menu,
  ActionIcon,
} from "@mantine/core";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ModalRevision from "../components/ModalRevision";
import Navbar from "../components/Navbar";
import ToolCard from "../components/ToolCard";
import { ClimbingBoxLoader } from "react-spinners";
import { getOneUser } from "../services/users";
import Cookies from "js-cookie";
import useStore from "../store";
import tools from "../tools/index";
import RevisionToolCard from "../components/RevisionToolCard";
import PlumeLibreCard from "../components/PlumeLibreCard";
import ModalLoading from "../components/ModalLoading";
import { addToFavoriteSession } from "../services/revision";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalRevision: false,
      loading: true,
      redirect: false,
      last3: [],
      loadingMenu: false,
    };
  }

  componentDidMount() {
    setTimeout(async () => {
      try {
        if (
          Cookies.get("token") &&
          Cookies.get("userData") &&
          Cookies.get("id")
        ) {
          const data = await getOneUser(
            Cookies.get("token"),
            Cookies.get("id")
          );
          if (data.success) {
            this.props.store.setUserData(data.user);
            this.props.store.setCredit(data.user.credits);
            this.setState({ loading: false, last3: data.last3 });
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
    }, 500);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.redirect !== this.state.redirect &&
      this.state.redirect === true
    ) {
      this.props.navigation.navigate("/login");
    }
  }

  _favorite = (id) => {
    this.setState({ loadingMenu: true }, async () => {
      const data = await addToFavoriteSession(id, Cookies.get("token"));
      if (data.success) {
        this.props.store.setUserData(data.user);
        this.props.store.setCredit(data.user.credits);
        this.setState({ loadingMenu: false, last3: data.last3 });
      } else {
        this.setState({ loadingMenu: false });
        window.alert(
          "Une erreur inconnu a eu lieu veuillez nous contacter si le problème persiste"
        );
      }
    });
  };

  // _delete = (id) => {
  //   if (window.confirm("Etes vous sûre de vouloir supprimer cette éléments ? Cette action est irréversible")) {
  //     this.setState({ loadingMenu: true, }, async () => {
  //       const data = await addToFavorite(id, Cookies.get("token"));
  //       if (data.success) {
  //         this.props.store.setUserData(data.user);
  //         this.props.store.setCredit(data.user.credits);
  //         this.setState({ loadingMenu: false, last3: data.last3 });
  //       } else {
  //         this.setState({ loadingMenu: false, });
  //         window.alert("Une erreur inconnu a eu lieu veuillez nous contacter si le problème persiste")
  //       }
  //     });
  //   }
  // }

  _getLast3 = () => {
    let arrElement = [];
    for (let index in this.state.last3) {
      const el = this.state.last3[index];
      arrElement.push(
        <Card
          withBorder
          shadow="lg"
          radius="lg"
          style={{ overflow: "visible" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              fz="md"
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {el.subject}
            </Text>
            <ActionIcon onClick={() => this._favorite(el.id)}>
              <i
                style={{ color: el.favorite ? "tomato" : "white" }}
                className={`${
                  el.favorite ? "fa-solid" : "fa-regular"
                } fa-heart`}
              ></i>
            </ActionIcon>
          </div>
          <Button
            component={Link}
            to={`/chat/${el.id}`}
            variant="light"
            color="blue"
            fullWidth
            mt="md"
            radius="md"
          >
            Voir &nbsp;&nbsp;<i className="fa-solid fa-arrow-right"></i>
          </Button>
        </Card>
      );
    }
    return arrElement;
  };

  _getTools = () => {
    let arrElements = [];
    const newTools = tools.slice(1);
    for (let index in newTools) {
      const el = newTools[index];
      arrElements.push(
        <ToolCard
          onClick={() => this.props.navigation.navigate(newTools[index].to)}
          title={el.title}
          description={el.desc}
          icon={el.icon}
          colorCombo={el.colorCombo}
        />
      );
    }
    return arrElements;
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
            <h1 style={{ marginBottom: 0 }}>Sessions de révision</h1>
            <Card
              onClick={() => this.setState({ modalRevision: true })}
              withBorder
              shadow="lg"
              radius="lg"
              bg={"#273958"}
              style={{
                //backgroundColor: "#ffc107",
                //color: "black",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                border: "none",
              }}
            >
              <div
                style={{
                  marginBottom: "2%",
                  marginTop: "1.25%",
                  color: "#a5d8ff",
                }}
              >
                <i className="fa-solid fa-square-plus fa-2xl"></i>
              </div>
              <Text
                style={{ marginBottom: "1.25%", color: "#a5d8ff" }}
                fz="lg"
                fw={700}
              >
                Démarrer une session de révision
              </Text>
            </Card>

            {this.state.last3.length > 0 ? (
              <>
                <Grid align={"center"} justify={"space-between"}>
                  <Grid.Col span={6}>
                    <h2>Historique</h2>
                  </Grid.Col>
                  <Grid.Col span={6} style={{ textAlign: "right" }}>
                    <Link
                      to={"/account/history"}
                      style={{ textDecoration: "none", color: "grey" }}
                    >
                      <i
                        className="fa-solid fa-history"
                        style={{ color: "grey" }}
                      ></i>
                      &nbsp; Voir tout l'historique
                    </Link>
                  </Grid.Col>
                </Grid>

                <SimpleGrid
                  cols={3}
                  breakpoints={[{ maxWidth: "sm", cols: 1 }]}
                >
                  {this._getLast3()}
                </SimpleGrid>
              </>
            ) : null}

            <h1 style={{ marginBottom: 0, marginTop: "5%" }}>Rédactions</h1>
            <Text>Découvrez nos ingénieux outils de rédaction</Text>
            <br />
            <PlumeLibreCard
              onClick={() => this.props.navigation.navigate(tools[0].to)}
            />
            <SimpleGrid
              style={{ marginTop: "2%", marginBottom: "10%" }}
              cols={3}
              breakpoints={[{ maxWidth: "sm", cols: 1 }]}
            >
              {this._getTools()}
            </SimpleGrid>

            <h1 style={{ marginBottom: 0, marginTop: "5%" }}>
              Outils de révision
            </h1>
            <Text>Découvrez nos révolutionnaires outils de révision</Text>
            <SimpleGrid
              style={{ marginTop: "2%", marginBottom: "10%" }}
              cols={3}
              breakpoints={[{ maxWidth: "sm", cols: 1 }]}
            >
              <RevisionToolCard
                title={"Carte mentale"}
                description={
                  "Organisez visuellement vos idées et vos informations pour faciliter la compréhension et la mémorisation."
                }
                icon={<i className="fas fa-brain"></i>}
                onClick={() =>
                  this.props.navigation.navigate("/revision/mind-map")
                }
              />
              <RevisionToolCard
                title={"Frise Chronologique"}
                description={
                  "Visualisez l'histoire, les séquences d'événements ou l'évolution d'un sujet au fil du temps."
                }
                icon={<i className="fas fa-stream"></i>}
                onClick={() =>
                  this.props.navigation.navigate("/revision/timeline")
                }
              />
              <RevisionToolCard
                title={"Flashcards"}
                description={
                  "Renforcez la mémorisation par la répétition avec des cartes de questions et de réponses."
                }
                icon={<i className="fas fa-layer-group"></i>}
                onClick={() =>
                  this.props.navigation.navigate("/revision/flashcards")
                }
              />
              {/* <RevisionToolCard
                title={"Quiz"}
                description={
                  "Testez vos connaissances, préparez-vous à un examen ou apprenez de manière ludique."
                }
                icon={<i className="fas fa-question-circle"></i>}
                onClick={() => this.props.navigation.navigate("/revision/quiz")}
              /> */}
            </SimpleGrid>
            <br />
            <br />
          </Container>
          <ModalRevision
            show={this.state.modalRevision}
            onClose={() => this.setState({ modalRevision: false })}
          />
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

export default withStoreAndNavigate(Home);
