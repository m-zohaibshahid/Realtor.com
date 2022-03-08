import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import "./Sidebarchat.css";
import { useSelector } from "react-redux";

const SidebarChat = ({ i, room, onClickFunction, click }) => {
  const { user, token } = useSelector((state) => state.user);
  // if (loading) {
  //   <h1>loading..................</h1>;
  // }
  return (
    <div
      className={` ${room?.click ? "chatactive" : "sidebarChat"}`}
      onClick={() => {
        click(i);
        onClickFunction(
          room._id,
          room?.senderId,
          room?.receiverId,
          room?.senderName,
          room?.receiverName,
          i
        );
      }}
    >
      <Avatar
        style={{
          backgroundColor: "#0069D9",
          textTransform: "uppercase",
          marginTop: "7px",
        }}
      >
        {/* {room?.senderId.charAt(0)} */}
        {/* {room?.senderId == user._id ? room?.receiverName.charAt(0) : null}*/}
        {room?.senderId == user._id ? room?.receiverName.charAt(0) : null}
        {room?.receiverId == user._id ? room?.senderName.charAt(0) : null}
      </Avatar>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <div className="sidebarChat__info">
        <h2>{room?.senderId == user._id ? room?.receiverName : null}</h2>
        <h2>{room?.receiverId == user._id ? room?.senderName : null}</h2>
        <p>
          {room?.lastMessage.length > 15
            ? room?.lastMessage.substring(0, 15) + "..."
            : room?.lastMessage}
        </p>
      </div>
    </div>
  );
};

export default SidebarChat;
