import React from "react";
import io from "socket.io-client";
import axios from "axios";
import "./App.css";
import MessagesPanel from "./MessagesPanel";
const SERVER = "http://localhost:3001";

class App extends React.Component {
  state = { messages: [], socket: null };
  componentDidMount() {
    this.configSocket();
  }

  configSocket = () => {
    var socket = io(SERVER);
    socket.on("connection", () => {
      console.log("Connected to back end");
    });

    socket.on("updatedMessages", (messages) => {
      console.log("IN UPDATED MESSAGES ON");
      // console.log(messages);
      this.setState({ messages }, () => {
        console.log("JUST UPDATED STATE MESSAGES: ", this.state.messages);
      });
    });
    axios.get("http://localhost:3001/getMessages").then(async (res) => {
      let messages = await res.data.messages;
      console.log("DATA IS: ", messages);
      this.setState({ messages }, () => console.log(this.state));
    });
    this.setState({ socket }, () =>
      console.log("SOCKET UPDATED: ", this.state)
    );
  };

  handleSendMessage = (message) => {
    console.log("Sending message to backend");
    const msg = {
      sentAt: Date.now(),
      text: message,
      senderName: this.state.socket.id,
    };
    console.log(typeof msg.sentAt);
    this.state.socket.emit("receivedMessage", msg);
  };

  render() {
    return (
      <div className="App">
        <div></div>
        <h1>Chat App</h1>
        {/* <button onClick={() => handleSendMessage("HAHA")}>Send</button> */}
        <MessagesPanel
          messages={this.state.messages}
          sendMessage={this.handleSendMessage}
        />
        <button
          onClick={() => {
            axios.get("http://localhost:3001/getMessages").then(async (res) => {
              let messages = await res.data;
              this.setState({ messages }, () => {
                console.log(this.state);
              });
              console.log("MESSAGES ARE", messages);
            });
          }}
        >
          GET MESSAGES IN CONSOLE
        </button>
      </div>
    );
  }
}

export default App;
