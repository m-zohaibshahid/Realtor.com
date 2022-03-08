import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./ChatPage.css";
import { baseUrl } from "../../../config/baseUrl";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ChatPage = ({ address }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const { user, token } = useSelector((state) => state.user);
  const { id } = useParams();

  useEffect(() => {
    getRoom();
    console.log("agya is page pae");
    console.log("property by id", id);

    //deleteRoom();
  }, []);

  const getRoom = async () => {
    await fetch(`${baseUrl}/getMyRoom`, {
      method: "POST",
      body: JSON.stringify({
        uid: token,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        console.log("res2 => get my room", res2);
      })
      .catch((err) => console.log("err => get my room", err));
  };

  const deleteRoom = async () => {
    await fetch(`${baseUrl}/removeRoom/619782ed4922a12edc5606d9`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res2) => {
        console.log("deleted..", res2);
      })
      .catch((err) => console.log("err deleted", err));
  };

  const sendMessage = async (event) => {
    // if (currentMessage !== "") {
    //   const messageData = {};
    //   setCurrentMessage("");
    // }
    event.preventDefault();
    setCurrentMessage("");

    await fetch(`${baseUrl}/sendMessage`, {
      method: "POST",
      body: JSON.stringify({
        rid: id,
        mes: currentMessage,
        senderName: `${user.fname} ${user.lname}`,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        console.log("here is res2 of message", res2);
        setCurrentMessage("");
        getAllMessages(res2.roomId);
      })
      .catch((err) => console.log(err));
  };

  const getAllMessages = async (rid) => {
    const token = localStorage.getItem("token");
    await fetch(`${baseUrl}/messages/all/${rid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        console.log("here is res2 ====> ", res2);
        setMessageList(res2.messages);
      })
      .catch((err) => console.log("err deleted", err));
  };

  return (
    <div className="chat-window ">
      <div className="chat-header">
        <p>{address}</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, i) => {
            return (
              <div
                key={i}
                className="message"
                id={messageContent.senderId != user._id ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p style={{ color: "white" }}>{messageContent.mes}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.senderName}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage(event);
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
};

export default ChatPage;
