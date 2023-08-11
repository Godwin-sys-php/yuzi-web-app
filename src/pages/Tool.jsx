import React from "react";
import {
  Container,
  Grid,
  Text,
  ThemeIcon,
  Title,
  Card,
  createStyles,
  Paper,
  rem,
  TextInput,
  Textarea,
  Button,
  Divider,
  MediaQuery,
  SegmentedControl,
  CopyButton,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import Navbar from "../components/Navbar";
import tools from "../tools/index";
import url from "../services/url";
import url2 from "../services/url.socket";
import Cookies from "js-cookie";
import useStore from "../store";
import { useNavigate } from "react-router-dom";
import TextAnimation from "../components/TextAnimation";
import { io } from "socket.io-client";
import ModalTool from "../components/ModalTool";

const getToolData = () => {
  const { pathname } = window.location;
  let finalTool = {};
  for (let index in tools) {
    if (tools[index].to === pathname) {
      finalTool = tools[index];
      break;
    }
  }
  return finalTool;
};

const getBgImage = (theme) => {
  const { colorCombo } = getToolData();
  switch (colorCombo) {
    case 0:
      return "linear-gradient(#4A00E0 0%, #8E2DE2 100%)";
    case 1:
      return theme.fn.linearGradient(
        0,
        theme.colors.pink[6],
        theme.colors.orange[6]
      );
    case 2:
      return theme.fn.linearGradient(
        0,
        theme.colors.teal[6],
        theme.colors.lime[6]
      );
    case 3:
      return theme.fn.linearGradient(
        0,
        theme.colors.teal[6],
        theme.colors.blue[6]
      );
    case 4:
      return theme.fn.linearGradient(
        0,
        theme.colors.indigo[6],
        theme.colors.cyan[6]
      );
  }
};

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    overflow: "hidden",
    padding: theme.spacing.md,
    paddingLeft: `calc(${theme.spacing.sm} * 2)`,
    boxShadow: theme.shadows.md,

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: rem(6),
      backgroundImage: getBgImage(theme),
    },
  },
  hr: {
    height: rem(3),
    width: "100%",
    backgroundImage: getBgImage(theme),
    marginTop: "2%",
  },
}));

class Tool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toolData: null,
      prompts: null,
      result: "",
      loadingExample: false,
      direction: "auto",
      loadingButton: false,
      error: "",
      completionId: "",
      loading: true,
      historyTool: false,
      historyData: [],
      id: null,
      favorite: false,
      addingToFavorite: false,
    };
  }

  async componentDidMount() {
    try {
      if (
        Cookies.get("token") &&
        Cookies.get("userData") &&
        Cookies.get("id")
      ) {
        const socket = io(url2, {
          transports: ["websocket"],
          reconnection: true,
          reconnectionDelay: 60000,
        });
        socket.on("completionId", async (response) => {
          if (response.userId == Cookies.get("id")) {
            this.setState({ completionId: response.completionId });
          }
        });
        socket.on("completion", async (response) => {
          if (
            response.userId == Cookies.get("id") &&
            response.completionId == this.state.completionId
          ) {
            this.setState({ result: response.data });
          }
        });

        const data = getToolData();
        let prompts = [];
        for (let index in data.prompts) {
          prompts.push({ ...data.prompts[index], value: "" });
        }
        const history = await fetch(`${url}/tools/history`, {
          method: "POST",
          body: JSON.stringify({
            name: data.title,
          }),
          headers: {
            Authorization: "Bearer " + Cookies.get("token"),
            "Content-type": "application/json; charset=UTF-8",
          },
        }).then((res) => res.json());
        if (history.success) {
          this.props.store.setUserData(history.user);
          this.props.store.setCredit(history.user.credits);
          console.log(history.data);
          this.setState({
            toolData: data,
            prompts: prompts,
            loading: false,
            historyData: history.data,
          });
        } else if (history.invalidToken) {
          Cookies.remove("token");
          Cookies.remove("userData");
          Cookies.remove("id");
          this.props.store.setToken("");
          this.props.store.setUserData({});
          this.setState({ redirect: true });
        } else {
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

  _getFrom = () => {
    const { colorCombo } = this.state.toolData;
    switch (colorCombo) {
      case 0:
        return "#4A00E0";
      case 1:
        return "pink";
      case 2:
        return "teal";
      case 3:
        return "teal";
      case 4:
        return "indigo";
    }
  };

  _getTo = () => {
    const { colorCombo } = this.state.toolData;
    switch (colorCombo) {
      case 0:
        return "#8E2DE2";
      case 1:
        return "orange";
      case 2:
        return "lime";
      case 3:
        return "blue";
      case 4:
        return "cyan";
    }
  };

  _changeValue = (e, i) => {
    if (e.target.value.length <= this.state.prompts[i].maxLength) {
      let newState = this.state.prompts;
      newState[i].value = e.target.value;
      this.setState({ prompts: newState });
    }
  };

  _getInput = () => {
    let arrElements = [];
    for (let index in this.state.prompts) {
      const el = this.state.prompts[index];
      if (el.type === "input") {
        arrElements.push(
          <TextInput
            size={"md"}
            label={el.title + ":"}
            placeholder={el.placeholder}
            value={el.value}
            mb={"sm"}
            description={`${el.value.length}/${el.maxLength}`}
            inputWrapperOrder={["label", "input", "description", "error"]}
            required={el.required}
            onChange={(event) => this._changeValue(event, index)}
          />
        );
      } else {
        arrElements.push(
          <Textarea
            label={el.title + ":"}
            placeholder={el.placeholder}
            required={el.required}
            value={el.value}
            minRows={5}
            size={"md"}
            description={`${el.value.length}/${el.maxLength}`}
            onChange={(event) => this._changeValue(event, index)}
            inputWrapperOrder={["label", "input", "description", "error"]}
          />
        );
      }
    }
    //window.scrollTo(0, 0);
    return arrElements;
  };

  _onExample = () => {
    this.setState({ loadingExample: true }, async () => {
      let copyOfState = this.state.prompts;

      for (let index in this.state.prompts) {
        copyOfState[index].value = "";

        await new Promise((resolve) => {
          this.setState({ prompts: copyOfState, result: "" }, () => {
            let indexTxt1 = 0;
            let intervalId1 = window.setInterval(() => {
              if (indexTxt1 < this.state.prompts[index].example.length) {
                let nextChar = this.state.prompts[index].example[indexTxt1];
                copyOfState[index].value += nextChar;
                this.setState({ prompts: copyOfState }, () => {
                  indexTxt1++;
                });
              } else {
                clearInterval(intervalId1);
                resolve();
              }
            }, 10);
          });
        });
      }

      // let indexTxt2 = 0;
      // let intervalId2 = window.setInterval(() => {
      //   if (indexTxt2 < this.state.toolData.example.output.length) {
      //     let nextChar = this.state.toolData.example.output[indexTxt2];
      //     if (nextChar === "\n") {
      //       nextChar = "<br/>";
      //     } else if (nextChar === "'") {
      //       nextChar = "&#39;";
      //     }
      //     this.setState({ result: this.state.result + nextChar }, () => {
      //       indexTxt2++;
      //     });
      //   } else {
      //     clearInterval(intervalId2);
      //     this.setState({ loadingExample: false });
      //   }
      // }, 10);
      this.setState({ result: this.state.toolData.example.output });
    });
  };

  _getObj2Send = () => {
    let obj = {};
    for (let index in this.state.prompts) {
      obj[this.state.prompts[index].attr] = this.state.prompts[index].value;
    }
    return obj;
  };

  _sendRequest = () => {
    this.setState({ loadingButton: true, error: "", result: "", id: null, favorite: false }, async () => {
      const data2Send = this._getObj2Send();
      const data = await fetch(`${url}${this.state.toolData.api}`, {
        method: "POST",
        body: JSON.stringify(data2Send),
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((res) => res.json());
      if (data.success) {
        this.setState({
          id: data.id,
          loadingButton: false,
          result: data.output,
          historyData: data.history,
        });
      } else {
        this.setState({ error: data.message });
      }
    });
  };

  _addToFavorite = () => {
    if (!this.state.addingToFavorite) {
      this.setState({ addingToFavorite: true, }, async () => {
        const data = await fetch(`${url}/tools/favorite/${this.state.id}`, {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + Cookies.get("token"),
          },
        }).then((res) => res.json());
        if (data.success) {
          this.setState({
            favorite: data.favorite,
          });
        }
      });
    }
  };

  _displayBtn = () => {
    let valid = true;
    for (let index in this.state.prompts) {
      const el = this.state.prompts[index];
      if (el.required) {
        if (
          !(el.value.length >= el.minLength && el.value.length <= el.maxLength)
        ) {
          valid = false;
        }
      }
    }
    return (
      <Button
        disabled={!valid}
        onClick={valid ? this._sendRequest : null}
        variant={"light"}
        color={this._getFrom()}
        fullWidth
        loading={this.state.loadingButton}
      >
        {!this.state.loadingButton && "Envoyer"}
      </Button>
    );
  };

  render() {
    console.log(this.state.completionId);
    if (this.state.toolData !== null && !this.state.loading) {
      const classes = this.props.classes;
      const data = this.state.toolData;
      const LONGUEUR_MAX = 1000;
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
                    from: this._getFrom(),
                    to: this._getTo(),
                  }}
                >
                  <span style={{ fontSize: "2em" }}>{data.icon}</span>
                </ThemeIcon>
              </Grid.Col>
              <Grid.Col sm={12} md={10}>
                <Title size="h1">{data.title}</Title>
                <Text size={"md"}>{data.desc}</Text>
              </Grid.Col>
            </Grid>
          </Container>
          <div className={classes.hr}></div>
          <Container>
            <br />
            <MediaQuery smallerThan="md" styles={{ display: "none" }}>
              <div>
                <SegmentedControl
                  value={this.state.direction}
                  onChange={(value) => this.setState({ direction: value })}
                  data={[
                    { label: "Auto", value: "auto" },
                    {
                      label: <i className="fa-solid fa-grip fa-xl"></i>,
                      value: "horizontal",
                    },
                    {
                      label: (
                        <i className="fa-solid fa-grip-vertical fa-xl"></i>
                      ),
                      value: "vertical",
                    },
                  ]}
                  bg={"#242537"}
                />
                <br />
                <br />
              </div>
            </MediaQuery>
            <Grid>
              <Grid.Col
                sm={12}
                md={
                  this.state.direction == "auto"
                    ? this.state.result.length > LONGUEUR_MAX
                      ? 12
                      : 6
                    : this.state.direction == "horizontal"
                    ? 6
                    : 12
                }
              >
                <Paper
                  withBorder
                  radius="md"
                  className={classes.card}
                  bg={"#242537"}
                >
                  <Grid>
                    <Grid.Col span={8}>
                      <Title size={"h4"} mb="md">
                        Données requises
                      </Title>
                    </Grid.Col>
                    <Grid.Col style={{ textAlign: "right" }} span={4}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Button
                          variant={"light"}
                          size={"xs"}
                          disabled={this.state.loadingButton}
                          onClick={() =>
                            this.state.loadingExample ? null : this._onExample()
                          }
                        >
                          <i className="fa-solid fa-circle-info"></i>
                        </Button>
                        <Button
                          variant={"light"}
                          size={"xs"}
                          ml={"xs"}
                          disabled={this.state.loadingButton}
                          onClick={() => this.setState({ historyTool: true })}
                        >
                          <i className="fa-solid fa-clock-rotate-left"></i>
                        </Button>
                      </div>
                    </Grid.Col>
                  </Grid>
                  {this._getInput()}
                  <br />
                  {this._displayBtn()}
                </Paper>
              </Grid.Col>
              <Grid.Col
                sm={12}
                md={
                  this.state.direction == "auto"
                    ? this.state.result.length > LONGUEUR_MAX
                      ? 12
                      : 6
                    : this.state.direction == "horizontal"
                    ? 6
                    : 12
                }
              >
                <Card withBorder shadow="lg" radius="md">
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <ThemeIcon
                      size="xl"
                      radius="md"
                      variant="gradient"
                      gradient={{
                        deg: 0,
                        from: this._getFrom(),
                        to: this._getTo(),
                      }}
                    >
                      {data.icon}
                    </ThemeIcon>
                    <Text size={"sm"}>{data.output.desc}</Text>
                  </div>
                  <Divider mt={"xs"} style={{ borderWidth: "O.5px" }} />
                  <br />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: this.state.result.replace(/\n/g, "<br />"),
                    }}
                    onEnd={() => this.setState({ loadingExample: false })}
                  ></div>
                  {this.state.id !== null && (
                    <>
                      <br />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <CopyButton value={this.state.result}>
                          {({ copied, copy }) => (
                            <Tooltip
                              label={copied ? "Copié" : "Copier"}
                              withArrow
                            >
                              <ActionIcon
                                color={copied ? "teal" : "gray"}
                                onClick={copy}
                                variant="light"
                              >
                                {copied ? (
                                  <i className="fa-solid fa-check"></i>
                                ) : (
                                  <i className="fa-regular fa-copy"></i>
                                )}
                              </ActionIcon>
                            </Tooltip>
                          )}
                        </CopyButton>
                        <Tooltip label={"Favoris"} withArrow>
                          <ActionIcon
                            color={"gray"}
                            onClick={() => this._addToFavorite()}
                            variant="light"
                          >
                            <i
                              style={{
                                color: this.state.favorite
                                  ? "tomato"
                                  : "inherit",
                              }}
                              className="fa-solid fa-heart"
                            ></i>
                          </ActionIcon>
                        </Tooltip>
                      </div>
                    </>
                  )}
                </Card>
              </Grid.Col>
            </Grid>
            <br />
            <br />
            <br />
          </Container>
          <ModalTool
            show={this.state.historyTool}
            name={data.title}
            data={this.state.historyData}
            onClose={() => {
              this.setState({ historyTool: false });
            }}
          />
        </>
      );
    }
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

export default wRizz(Tool);
