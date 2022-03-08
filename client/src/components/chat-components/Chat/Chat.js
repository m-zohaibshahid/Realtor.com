import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import React, { useState, useEffect, useRef } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import "./Chat.css";
import { useSelector } from "react-redux";
import moment from "moment";
import { baseUrl } from "../../../config/baseUrl";
import { format } from "timeago.js";
import { useHistory } from "react-router-dom";
const Chat = ({
  messages,
  roomId,
  senderId,
  receiverId,
  senderName,
  receiverName,
  roomName,
  onClickFunction,
}) => {
  const { user, token } = useSelector((state) => state.user);
  const [currentMessage, setCurrentMessage] = useState("");
  // const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("tokennnnn", token);
    if (token == null) {
      history.push("/");
    }
  }, []);
  useEffect(() => {
    if (senderId == "") {
    } else {
      const interval = setInterval(() => {
        onClickFunction(roomId, senderId, receiverId, senderName, receiverName);
      }, 1000);
      // setLoading(true);
      return () => clearInterval(interval);
    }
  }, [roomId]);

  const sendMessage = async (event) => {
    event.preventDefault();
    setCurrentMessage("");
    // setLoading(false);

    // scrollToBottom();
    await fetch(`${baseUrl}/inbox/messages/send`, {
      method: "POST",
      body: JSON.stringify({
        roomId,
        senderId,
        receiverId,
        senderName: `${user.fname} ${user.lname}`,
        mes: currentMessage,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        console.log("here is res2 of message", res2);

        // setCurrentMessage("");
      })
      // .catch(
      //   (err) => setLoading(false);

      //   console.log(err)
      // );
      .catch((err) => {
        console.log(err);
      });
  };
  // if (loading) {
  //   return (
  //     <div className="property-page-area pd-top-120 pd-bottom-90 ">
  //       <div className="container ">
  //         <div className="row justify-content-center">
  //           <div className="col-md-12 col-12 text-center">Loading...</div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  console.log("here is messages .....", messages);

  return (
    <div className="chat">
      <div className="chat__header">
        {senderId !== user._id && receiverId !== user._id ? (
          <Avatar />
        ) : (
          <Avatar
            style={{ backgroundColor: "#0069D9", textTransform: "uppercase" }}
          >
            {/* {room?.senderId.charAt(0)} */}
            {/* {room?.senderId == user._id ? room?.receiverName.charAt(0) : null}*/}
            {senderId == user._id ? receiverName.charAt(0) : null}
            {receiverId == user._id ? senderName.charAt(0) : null}
          </Avatar>
        )}

        <div className="chat__headerInfo">
          <h4 style={{ textTransform: "capitalize" }}>
            {/* {console.log(
              "sender id => senderId",
              senderId,
              "name => ",
              senderName
            )}
            {console.log(
              "receiver id => receiver id",
              receiverId,
              "name => ",
              receiverName
            )}
            {console.log(
              "user id => user id",
              user?._id,
              "name => ",
              user?.fname,
              " ",
              user?.lname
            )} */}
            {senderId == user?._id ? receiverName : null}
            {receiverId == user?._id ? senderName : null}
          </h4>
          {/* <p>Last seen at...</p> */}
        </div>

        {/* <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div> */}
      </div>
      <div className="chat__body">
        {/* <ScrollToBottom className="message-container"> */}

        <ScrollToBottom className="message-container">
          {messages?.map((item, i) => (
            <>
              {item.senderId == user._id ? (
                <>
                  <div className={`chat__message chat__reciever chat`}>
                    <span className="chat__name">You</span>
                    {/* {loading ? "...." : <>{item.mes}</>} */}
                    {item.mes}
                    <span className="chat__timestamp">
                      {/* {moment(item?.createdAt).fromNow()} */}
                      {/* {format(item.createdAt)} */}
                      {moment(item.createdAt).format("LT")}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <p className={`chat__message chat__sender`}>
                    <span className="chat__name">{item?.senderName}</span>
                    {item.mes}
                    <span className="chat__timestamp">
                      {/* {moment(item?.createdAt).fromNow()} */}

                      {/* {format(item.createdAt)} */}
                      {moment(item.createdAt).format("LT")}
                    </span>
                  </p>
                </>
              )}
              <div ref={messagesEndRef} />
            </>
          ))}
        </ScrollToBottom>
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <AttachFile />
        <form action="">
          <input
            value={currentMessage}
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            type="text"
            placeholder="Type a message"
            onKeyPress={(event) => {
              // event.key === "Enter" && sendMessage(event) && ScrollToBottom();
              event.key === "Enter" && sendMessage(event) && scrollToBottom();
            }}
          />
          {/* <button onClick={(event) => sendMessage(event)} type="submit">
            Send a message
          </button> */}
        </form>
        <Mic />
      </div>
    </div>
  );
};

export default Chat;
