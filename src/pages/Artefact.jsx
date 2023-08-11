import React from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
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
} from "@mantine/core";
import useStore from "../store";
import url from "../services/url";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { ClimbingBoxLoader } from "react-spinners";
import FlashCardsNode from "../components/FlashCardsNode";
import TimelineNode from "../components/TimelineNode";
import QuizComponent from "react-quiz-component";

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

class Artefact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: null,
      redirect: false,
    };
    this.div = React.createRef();
  }

  async componentDidMount() {
    try {
      if (
        Cookies.get("token") &&
        Cookies.get("userData") &&
        Cookies.get("id")
      ) {
        const data = await fetch(
          `${url}/revision-tools/artefacts/${this.props.id}`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + Cookies.get("token"),
            },
          }
        ).then((res) => res.json());
        if (data.success) {
          this.setState({ isLoading: false, data: data.data });
        } else if (data.invalidToken) {
          Cookies.remove("token");
          Cookies.remove("userData");
          Cookies.remove("id");
          this.props.store.setToken("");
          this.props.store.setUserData({});
          this.setState({ redirect: true });
        } else {
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

  _getIcon = () => {
    switch (this.state.data.name) {
      case "Carte mentale":
        return <i className="fas fa-brain"></i>;
      case "Flashcards":
        return <i className="fas fa-layer-group"></i>;
      case "Quiz":
        return <i className="fas fa-question-circle"></i>;
      case "Frise Chronologique":
        return <i className="fas fa-stream"></i>;
    }
  };
  
  _capture = () => {
    html2canvas(this.div.current).then(canvas => {
      canvas.toBlob((blob) => {
          saveAs(blob, 'maImage.jpeg');
      }, 'image/jpeg');
  });
  }

  _getDescription = () => {
    switch (this.state.data.name) {
      case "Carte mentale":
        return "Organisez visuellement vos idées et vos informations pour faciliter la compréhension et la mémorisation.";
      case "Flashcards":
        return "Renforcez la mémorisation par la répétition avec des cartes de questions et de réponses.";
      case "Quiz":
        return "Testez vos connaissances, préparez-vous à un examen ou apprenez de manière ludique.";
      case "Frise Chronologique":
        return "Visualisez l'histoire, les séquences d'événements ou l'évolution d'un sujet au fil du temps.";
    }
  };

  _getDisplay = () => {
    switch (this.state.data.name) {
      case "Carte mentale":
        return <MindMapNode node={JSON.parse(this.state.data.output)} />;
      case "Flashcards":
        return (
          <FlashCardsNode data={JSON.parse(this.state.data.output).data} />
        );
      case "Quiz":
        let result = JSON.parse(this.state.data.output);
        result.appLocale = {
          landingHeaderText: "<questionLength> Questions",
          question: "Question",
          startQuizBtn: "Commencer le quiz",
          resultFilterAll: "All",
          resultFilterCorrect: "Correcte",
          resultFilterIncorrect: "Incorrecte",
          nextQuestionBtn: "Suivant",
          prevQuestionBtn: "Retour",
          resultPageHeaderText: "Vous avez terminé le quiz !",
          resultPagePoint: "<correctPoints> / <totalPoints>",
          singleSelectionTagText: "Choix simple",
          multipleSelectionTagText: "Choix multiple",
          pickNumberOfSelection: "<numberOfSelection> réponses",
        };
        return <QuizComponent shuffle showInstantFeedback quiz={result} />;
      case "Frise Chronologique":
        return <TimelineNode data={JSON.parse(this.state.data.output).data} />;
    }
  };

  render() {
    const classes = this.props.classes;
    if (this.state.isLoading) {
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
                  <span style={{ fontSize: "2em" }}>{this._getIcon()}</span>
                </ThemeIcon>
              </Grid.Col>
              <Grid.Col sm={12} md={10}>
                <Title size="h1">{this.state.data.name}</Title>
                <Text size={"md"}>{this._getDescription()}</Text>
              </Grid.Col>
            </Grid>
          </Container>
          <div className={classes.hr}></div>
          <Container>
            <Paper
              withBorder
              radius="md"
              className={classes.card}
              bg={"#242537"}
            >
              <Text fw={"bolder"} size={"lg"}>{this.state.data.input}</Text>
            </Paper>
          </Container>
          <Button onClick={this._capture}>Télécharger</Button>
          <div ref={this.div}>
            {this._getDisplay()}
          </div>
        </>
      );
    }
  }
}

const wRizz = (BaseComponent) => (props) => {
  const { classes } = useStyles();
  const store = useStore();
  const navigate = useNavigate();
  let { id } = useParams();
  id = atob(id);
  return (
    <BaseComponent
      {...props}
      store={store}
      navigation={{ navigate: navigate }}
      classes={classes}
      id={id}
    />
  );
};

export default wRizz(Artefact);
