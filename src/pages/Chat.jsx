import React, { Component } from "react";
import {
  Paper,
  SimpleGrid,
  Progress,
  Textarea,
  Button,
  Text,
  Grid,
  Loader,
} from "@mantine/core";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { getOne, sendMessage } from "../services/revision";
import useStore from "../store";
import TextAnimation from "../components/TextAnimation";
import Cookies from "js-cookie";
import io from "socket.io-client";
import url from "../services/url.socket";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      messages: [],
      data: [],
      newMessage: "",
      loading: true,
      loadingButton: false,
      token: this.props.token,
      completionId: null,
      receiviedMessage: "",
    };
  }

  handleSend = async () => {
    const chat2send = this.state.newMessage;
    this.setState((prevState) => ({
      messages: [
        ...prevState.messages,
        { content: prevState.newMessage, role: "user" },
      ],
      newMessage: "",
      loadingButton: true,
    }));

    const data = await sendMessage(
      this.state.id,
      { chat: chat2send },
      this.state.token
    );
    console.log(data);
    if (data.success) {
      let newChats = data.revision.chat;
      newChats[newChats.length - 1] = {
        ...newChats[newChats.length - 1],
        isNew: true,
      };
      this.setState({
        loadingButton: false,
        messages: data.revision.chat,
        data: data.revision,
        receiviedMessage: "",
      });
      window.scrollTo(0, document.body.scrollHeight);
    } else {
    }
  };

  getData = async () => {
    const data = await getOne(this.state.id, this.state.token);
    console.log(data);
    if (data.success) {
      this.setState({
        loading: false,
        loadingButton: false,
        messages: data.revision.chat,
        data: data.revision,
        receiviedMessage: "",
      });
      window.scrollTo(0, document.body.scrollHeight);
    } else {
    }
  };

  componentDidMount() {
    console.log(this.props.token);
    const socket = io(url, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionDelay: 60000,
    });
    socket.on("chatCompletionId", async (response) => {
      if (response.userId == Cookies.get("id")) {
        this.setState({ completionId: response.completionId });
      }
    });
    socket.on("chatCompletion", async (response) => {
      if (
        response.userId == Cookies.get("id") &&
        response.completionId == this.state.completionId
      ) {
        this.setState({ receiviedMessage: response.data });
      }
    });

    console.log("hey");
    this.getData();
  }

  componentWillUnmount() {
    console.log("This will be logged on unmount");
  }

  render() {
    const loading = this.state.loading;
    const messages = this.state.messages;
    const data = this.state.data;
    const newMessage = this.state.newMessage;
    const loadingButton = this.state.loadingButton;

    if (loading) {
      return (
        <>
          <Navbar />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "calc(100vh - 5rem)",
            }}
          >
            <Loader size={"xl"} />
          </div>
        </>
      );
    }

    return (
      <>
        <Navbar />
        <div style={{ backgroundColor: "#0c0d21" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "calc(100vh - 5rem)",
              backgroundColor: "#242537",
            }}
          >
            <div
              style={{
                overflow: "visible",
                flexGrow: 1,
                marginBottom: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              {messages.map((message, index) => (
                <>
                  <Paper
                    p={"lg"}
                    style={{
                      alignSelf: "stretch",
                      backgroundColor:
                        message.role === "assistant" ? "#242537" : "#34354a",
                    }}
                    key={index}
                  >
                    <div>
                      <Text size={"xl"} fw={"bold"}>
                        {message.role === "assistant" ? "IA" : "Vous"}
                      </Text>
                    </div>
                    <br />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: message.content.replace(
                          /(?:\r\n|\r|\n)/g,
                          "<br>"
                        ),
                      }}
                    ></div>
                  </Paper>
                </>
              ))}
              {this.state.loadingButton ? (
                <Paper
                  p={"lg"}
                  style={{
                    alignSelf: "stretch",
                    backgroundColor: "#242537",
                  }}
                >
                  <div>
                    <Text size={"xl"} fw={"bold"}>
                      {"IA"}
                    </Text>
                  </div>
                  <br />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: this.state.receiviedMessage.replace(
                        /(?:\r\n|\r|\n)/g,
                        "<br>"
                      ),
                    }}
                  ></div>
                </Paper>
              ) : null}
            </div>
            {!loading ? (
              <>
                <div
                  style={{
                    width: "50%",
                    marginBottom: "15px",
                    marginTop: "10px",
                    alignSelf: "center",
                  }}
                >
                  <Progress
                    radius="md"
                    size="xl"
                    value={parseInt((data.tokenNbre / 3700) * 100)}
                    label={`${parseInt((data.tokenNbre / 3700) * 100)}%`}
                  />
                </div>
              </>
            ) : null}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                position: "sticky",
                bottom: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 5,
                  backgroundColor: "#242537",
                }}
              >
                <Textarea
                  placeholder="Votre message"
                  value={newMessage}
                  onChange={(event) =>
                    this.setState({ newMessage: event.currentTarget.value })
                  }
                  style={{ flexGrow: 1 }}
                  minRows={1}
                  size={"md"}
                />
                <Button
                  variant="light"
                  size={"lg"}
                  onClick={this.handleSend}
                  style={{ height: "100%" }}
                  loading={loadingButton}
                >
                  {!loadingButton && (
                    <i className="fa-solid fa-paper-plane"></i>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const withStoreAndParams = (BaseComponent) => (props) => {
  const token = useStore((state) => state.token);
  const { id } = useParams();
  return <BaseComponent {...props} token={token} id={id} />;
};

export default withStoreAndParams(Chat);
