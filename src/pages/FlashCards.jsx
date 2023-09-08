import React from "react";
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
import FlashCardsNode from "../components/FlashCardsNode";

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

class FlashCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      result: null,
      subject: "",
      elements: "",
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
      const data = await fetch(`${url}/revision-tools/flashcards`, {
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
        this.setState({ isLoading: false, result: data.output, });
      } else {
        this.setState({ error: data.message, loadingButton: false, result: "", id: null, favorite: false, });
      }
    });
  }

  _displayButton = () => {
    const valid = ((this.state.subject.length >= 1 && this.state.subject.length <= 100) && (this.state.elements.length >= 0 && this.state.elements.length <= 200));

    return <Button
      disabled={!valid}
      onClick={valid ? this._sendRequest : null}
      variant={"light"}
      color={"grape"}
      fullWidth
      loading={this.state.isLoading}
    >
      {"Envoyer"}
    </Button>;
  };

  render() {
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
                  <i className="fas fa-layer-group"></i>
                </span>
              </ThemeIcon>
            </Grid.Col>
            <Grid.Col sm={12} md={10}>
              <Title size="h1">{"Flashcards"}</Title>
              <Text size={"md"}>
                {
                  "Renforcez la mémorisation par la répétition avec des cartes de questions et de réponses."
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
              placeholder={"Le sujet sur lequel générer les flashcards"}
              mb={"sm"}
              value={this.state.subject}
              description={`${this.state.subject.length}/${100}`}
              inputWrapperOrder={["label", "input", "description", "error"]}
              required={true}
              onChange={this._handleSubject}
            />
            <Textarea
              label={"Questions / éléments à inclure (optionnel):"}
              placeholder={
                "Des éléments / questions en plus à rajouter"
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
        {this.state.result !== null ? <FlashCardsNode data={JSON.parse(this.state.result).data} /> : null}
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

export default wRizz(FlashCards);