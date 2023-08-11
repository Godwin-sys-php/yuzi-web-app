import React from "react";
import { Button, Card, Grid, Text } from "@mantine/core";
import ReactCardFlip from "react-card-flip";

export default class FlashCardsNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      flip: Array(this.props.data.length).fill(false),
    };
  }

  _handleFlip = (index) => {
    let flips = this.state.flip;
    flips[index] = !flips[index];
    this.setState({ flip: flips, });
  }

  _displayElements = () => {
    console.log(this.state.flip);
    let arrElements = [];
    for (let index in this.state.data) {
      const el = this.state.data[index];
      arrElements.push(
        <Grid.Col sm={12} md={4}>
          <ReactCardFlip
            isFlipped={this.state.flip[index]}
            flipDirection="horizontal"
          >
            <Card withBorder shadow="lg" radius="lg" p={"5%"}>
              <Text fz={"md"}>{el.question}</Text>
              <Button
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
                onClick={() => this._handleFlip(index)}
              >
                Retourner
              </Button>
            </Card>

            <Card withBorder shadow="lg" radius="lg" p={"5%"}>
              <Text fz={"md"}>{el.answer}</Text>
              <Text fz={"sm"} fs={"italic"}>{el.explanation}</Text>
              <Button
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
                onClick={() => this._handleFlip(index)}
              >
                Retourner
              </Button>
            </Card>
          </ReactCardFlip>
        </Grid.Col>
      );
    }
    return arrElements;
  };

  render() {
    return (
      <Grid style={{ marginLeft: "5%", marginRight: "5%" }}>
        {this._displayElements()}
      </Grid>
    );
  }
}
