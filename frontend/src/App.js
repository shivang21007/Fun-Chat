import logo from "./logo.svg";
import "./App.css";
import "./index.css";
import { useState, useEffect } from "react";

import io from "socket.io-client";
import { nanoid } from "nanoid";

// no dotenv
//const socket = io.connect("http://192.168.0.100:8000"); //if you want to run-multiple devices
const socket = io.connect("http://localhost:8000");

//User Name Assign
const userName = nanoid(3);

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, userName });
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        <h6>
          <a href="https://github.com/shivang21007/Fun-Chat" target="_blank" rel="noreferrer">
            Made by Shivnag 😎
            </a>
        </h6>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Fun Chat</h1>
        {chat.map((payload, index) => {
          return (
            <p key={index}>
              <span>User : {payload.userName}</span> :{" "}
              <span>{payload.message}</span>
            </p>
          );
        })}

        <form onSubmit={sendChat}>
          <input
            type="text"
            name="chat"
            placeholder="Send text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button type="submit">Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
