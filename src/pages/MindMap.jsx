import React from "react";
import MindMapNode from "../components/MindMap";
import Navbar from "../components/Navbar";
import {
  Container,
  Grid,
  Text,
  ThemeIcon,
  Title,
  createStyles,
  Paper,
  rem,
  TextInput,
  Textarea,
  Button,
  Alert,
} from "@mantine/core";
import useStore from "../store";
import url from "../services/url";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

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
      background: "linear-gradient(#FC466B 0%, #3F5EFB 100%)",
    },
  },
  hr: {
    height: rem(3),
    width: "100%",
    backgroundImage: theme.fn.linearGradient(0, "#FC466B", "#3F5EFB"),
    marginTop: "2%",
  },
}));

class MindMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      result: null,
      subject: "",
      elements: "",
      redirect: false,
    };
  }

  componentDidMount() {
    try {
      if (
        Cookies.get("token") &&
        Cookies.get("userData") &&
        Cookies.get("id")
      ) {
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

  _handleSubject = (e) => {
    if (e.target.value.length <= 100) {
      this.setState({ subject: e.target.value });
    }
  };

  _handleElements = (e) => {
    if (e.target.value.length <= 200) {
      this.setState({ elements: e.target.value });
    }
  };

  _sendRequest = () => {
    this.setState({ isLoading: true, error: "", result: null }, async () => {
      const data = await fetch(`${url}/revision-tools/mind-map`, {
        method: "POST",
        body: JSON.stringify({
          subject: this.state.subject,
          elements: this.state.elements,
        }),
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((res) => res.json());
      if (data.success) {
        this.props.store.setUserData(data.user);
        this.props.store.setCredit(data.user.credits);
        this.setState({ isLoading: false, result: data.output });
      } else {
        this.setState({ error: data.message, loadingButton: false, result: "", id: null, favorite: false, });
      }
    });
  };

  _displayButton = () => {
    const valid =
      this.state.subject.length >= 1 &&
      this.state.subject.length <= 100 &&
      this.state.elements.length >= 0 &&
      this.state.elements.length <= 200;

    return (
      <Button
        disabled={!valid}
        onClick={valid ? this._sendRequest : null}
        variant={"light"}
        color={"grape"}
        fullWidth
        loading={this.state.isLoading}
      >
        {"Envoyer"}
      </Button>
    );
  };

  render() {
    // const data = {
    //   title: "La Seconde Guerre Mondiale",
    //   description: "Une guerre mondiale qui s'est déroulée de 1939 à 1945",
    //   subtopics: [
    //     {
    //       title: "Les causes de la guerre",
    //       description:
    //         "Les tensions politiques et économiques qui ont mené au déclenchement de la guerre",
    //       subtopics: [
    //         {
    //           title: "L'expansionnisme allemand",
    //           description:
    //             "La volonté d'Adolf Hitler de conquérir de nouveaux territoires en Europe",
    //           subtopics: [],
    //         },
    //         {
    //           title: "Le traité de Versailles",
    //           description:
    //             "Les sentiments de rancune et d'injustice ressentis par l'Allemagne suite aux conditions imposées par le traité",
    //           subtopics: [],
    //         },
    //         {
    //           title: "L'apaisement",
    //           description:
    //             "La politique de concessions menée par les pays européens envers l'Allemagne pour éviter la guerre",
    //           subtopics: [],
    //         },
    //       ],
    //     },
    //     {
    //       title: "Le déroulement de la guerre",
    //       description:
    //         "Les principales étapes de la guerre et les principaux événements qui se sont déroulés",
    //       subtopics: [
    //         {
    //           title: "Le Blitzkrieg",
    //           description:
    //             "La stratégie de guerre éclair mise en place par l'Allemagne pour envahir rapidement plusieurs pays européens",
    //           subtopics: [],
    //         },
    //         {
    //           title: "L'invasion de l'Union Soviétique",
    //           description:
    //             "L'opération Barbarossa qui a été lancée en juin 1941 pour conquérir l'URSS",
    //           subtopics: [],
    //         },
    //         {
    //           title: "L'entrée en guerre des États-Unis",
    //           description:
    //             "L'attaque de Pearl Harbor qui a poussé les États-Unis à entrer en guerre contre le Japon et l'Allemagne",
    //           subtopics: [],
    //         },
    //       ],
    //     },
    //     {
    //       title: "La victoire des Alliés",
    //       description:
    //         "Les événements et les batailles qui ont mené à la défaite de l'Allemagne et du Japon",
    //       subtopics: [
    //         {
    //           title: "Le débarquement de Normandie",
    //           description:
    //             "L'opération Overlord qui a permis aux Alliés de débarquer en France",
    //           subtopics: [],
    //         },
    //         {
    //           title: "La bataille de Stalingrad",
    //           description:
    //             "La résistance acharnée des Soviétiques qui a fait basculer le cours de la guerre sur le front de l'Est",
    //           subtopics: [],
    //         },
    //         {
    //           title: "Le largage des bombes atomiques",
    //           description:
    //             "Les bombardements atomiques d'Hiroshima et Nagasaki qui ont poussé le Japon à capituler",
    //           subtopics: [],
    //         },
    //       ],
    //     },
    //     {
    //       title: "La Doctrine Nazis",
    //       description: "L'idéologie du parti national-socialiste allemand",
    //       subtopics: [
    //         {
    //           title: "Le racisme",
    //           description:
    //             "La croyance en la supériorité de la race aryenne et la haine envers les Juifs et autres minorités",
    //           subtopics: [],
    //         },
    //         {
    //           title: "Le totalitarisme",
    //           description:
    //             "Le contrôle absolu de l'État sur la vie de ses citoyens",
    //           subtopics: [],
    //         },
    //         {
    //           title: "Le militarisme",
    //           description:
    //             "L'importance accordée à l'armée comme moyen de glorification nationale",
    //           subtopics: [],
    //         },
    //       ],
    //     },
    //   ],
    // };

    const classes = this.props.classes;

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
                variant="gradient"
                size={"xl"}
                gradient={{
                  deg: 0,
                  from: "#FC466B",
                  to: "#3F5EFB",
                }}
              >
                <span style={{ fontSize: "2em" }}>
                  <i className="fas fa-brain"></i>
                </span>
              </ThemeIcon>
            </Grid.Col>
            <Grid.Col sm={12} md={10}>
              <Title size="h1">{"Carte mentale"}</Title>
              <Text size={"md"}>
                {
                  "Organisez visuellement vos idées et vos informations pour faciliter la compréhension et la mémorisation."
                }
              </Text>
            </Grid.Col>
          </Grid>
        </Container>
        <div className={classes.hr}></div>
        <Container>
          <Paper withBorder radius="md" className={classes.card} bg={"#242537"}>
            <Grid>
              <Grid.Col span={10}>
                <Title size={"h4"} mb="md">
                  Données requises
                </Title>
              </Grid.Col>
              <Grid.Col style={{ textAlign: "right" }} span={2}>
                <Button variant={"light"} size={"xs"}>
                  <i className="fa-solid fa-circle-info"></i>
                </Button>
              </Grid.Col>
            </Grid>

            <TextInput
              size={"md"}
              label={"Sujet:"}
              placeholder={"Le sujet sur lequel faire la carte mentale"}
              mb={"sm"}
              value={this.state.subject}
              description={`${this.state.subject.length}/${100}`}
              inputWrapperOrder={["label", "input", "description", "error"]}
              required={true}
              onChange={this._handleSubject}
            />
            <Textarea
              label={"Elements à inclure:"}
              placeholder={
                "Des éléments précis à inclures dans la carte mentale"
              }
              value={this.state.elements}
              required={false}
              minRows={3}
              size={"md"}
              description={`${this.state.elements.length}/${200}`}
              onChange={this._handleElements}
              inputWrapperOrder={["label", "input", "description", "error"]}
            />
            {this.state.error && <Alert color="red">{this.state.error}</Alert>}
            <br />
            {this._displayButton()}
          </Paper>
        </Container>
        {this.state.result !== null ? (
          <MindMapNode node={JSON.parse(this.state.result)} />
        ) : null}
      </>
    );
  }
}

const wRizz = (BaseComponent) => (props) => {
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

export default wRizz(MindMap);
