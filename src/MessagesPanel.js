import React from "react";
import Message from "./Message";
import { getDisplayTime, guidGenerator } from "./utils";

class MessagesPanel extends React.Component {
  state = { textField: "" };

  handleTextInput = (e) => {
    console.log(e.target.value);
    this.setState({ textField: e.target.value }); // ERROR SAYS TEXTFIELD ISNT A FUNCTION
  };
  send = () => {
    this.props.sendMessage(this.state.textField);
    this.setState({ textField: "" });
  };
  render() {
    const { messages } = this.props;
    return (
      <div className="messages-panel">
        ‍
        <div className="messages-list">
          {messages.length &&
            messages.map((m) => (
              <Message
                key={guidGenerator()}
                senderName={m.senderName}
                text={m.text}
                date={getDisplayTime(m.sentAt)}
              ></Message> // key="WIP"
            ))}
        </div>
        ‍<div className="messages-input"></div>
        <input
          type="text"
          onChange={this.handleTextInput}
          value={this.state.textField}
        />
        ‍<button onClick={this.send}>Send</button>‍
      </div>
    );
  }
}
export default MessagesPanel;
