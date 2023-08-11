import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

export default class TimelineNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.setState({ data: this.props.data });
    }
  }

  _displayElements = () => {
    let arrElements = [];
    for (let index in this.state.data) {
      const el = this.state.data[index];
      arrElements.push(
        <VerticalTimelineElement
          className="vertical-timeline-element"
          contentStyle={{ background: "#FC466B", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  #FC466B" }}
          date={el.date}
          iconStyle={{ background: "#FC466B", color: "#fff" }}
        >
          <h3 className="vertical-timeline-element-title">{el.event}</h3>
          <p>{el.description}</p>
        </VerticalTimelineElement>
      );
    }
    return arrElements;
  };

  render() {
    return (
      <VerticalTimeline>
        {this._displayElements()}
        <VerticalTimelineElement
          iconStyle={{ background: "#3F5EFB", color: "#fff" }}
        />
      </VerticalTimeline>
    );
  }
}
