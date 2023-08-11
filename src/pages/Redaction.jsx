import {
  Container,
  Card,
  Text,
  Grid,
  Button,
  SimpleGrid,
  rem,
  createStyles,
  Menu,
  ActionIcon,
  ThemeIcon,
  Title,
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

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    overflow: "hidden",
    padding: theme.spacing.md,
    paddingLeft: `calc(${theme.spacing.sm} * 2)`,
    boxShadow: theme.shadows.xl,
    marginTop: "1rem",
    marginBottom: "1rem",

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: rem(6),
      background: "linear-gradient(red 0%, indigo 100%)",
    },
  },
  hr: {
    height: rem(3),
    width: "100%",
    backgroundImage: theme.fn.linearGradient(0, "red", "indigo"),
    marginTop: "2%",
  },
}));

class Redaction extends React.Component {
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

  async componentDidMount() {
    try {
      if (
        Cookies.get("token") &&
        Cookies.get("userData") &&
        Cookies.get("id")
      ) {
        const data = await getOneUser(Cookies.get("token"), Cookies.get("id"));
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
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.redirect !== this.state.redirect &&
      this.state.redirect === true
    ) {
      this.props.navigation.navigate("/login");
    }
  }

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
            <Menu
              position="bottom-end"
              style={{ zIndex: 10 }}
              shadow="md"
              width={200}
            >
              <Menu.Target>
                <ActionIcon>
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown style={{ zIndex: 10 }}>
                <Menu.Item
                  onClick={() => this._favorite(el.id)}
                  icon={
                    <i
                      className={`${
                        el.favorite ? "fa-solid" : "fa-regular"
                      } fa-heart`}
                    ></i>
                  }
                >
                  {el.favorite ? "Retirer des favoris" : "Ajouter au favoris"}
                </Menu.Item>
                <Menu.Item
                  color="red"
                  icon={<i className="fa-solid fa-trash"></i>}
                >
                  Supprimer
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
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
      const { classes } = this.props;
      return (
        <>
          <Navbar />
          <Container>
            <br />
            <Grid gutter={"sm"}>
              <Grid.Col sm={12} md={2}>
                <ThemeIcon
                  style={{ width: "5rem", height: "5rem" }}
                  radius="md"
                  size={"xl"}
                  color={"red"}
                >
                  <span style={{ fontSize: "2em" }}>
                    <i className="fa-solid fa-pen-nib"></i>
                  </span>
                </ThemeIcon>
              </Grid.Col>
              <Grid.Col sm={12} md={10}>
                <Title size="h1">{"Donnez vie à vos idées"}</Title>
                <Text size={"md"}>
                  {
                    "Élevez votre écriture à un niveau supérieur. Nos outils de rédaction IA vous soutiennent tout au long de votre processus créatif, qu'il s'agisse d'ébaucher des idées ou de peaufiner un texte."
                  }
                </Text>
              </Grid.Col>
            </Grid>
          </Container>
          <div className={classes.hr}></div>
          <Container style={{ marginTop: 0 }} mt={0}>
            <h1 style={{ marginBottom: 0, }}>Rédactions</h1>
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
          </Container>
        </>
      );
    }
  }
}

const withStoreAndNavigate = (BaseComponent) => (props) => {
  const { classes } = useStyles();
  const store = useStore();
  const navigate = useNavigate();
  return (
    <BaseComponent
      {...props}
      store={store}
      navigation={{ navigate: navigate }}
      classes={classes}
    />
  );
};

export default withStoreAndNavigate(Redaction);