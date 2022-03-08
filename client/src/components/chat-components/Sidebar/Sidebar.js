import React, { useState } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "../sidebarchat/Sidebarchat";

const Sidebar = ({ room, onC, click }) => {
  const [responosive, setResponsive] = useState(false);
  return (
    <div className="sidebar">
      <div className="sidebar__header ">
        {/* <Avatar>{room?.fname.charAt(0) + " " + room?.lname.charAt(0)}</Avatar> */}
        <Avatar></Avatar>
        <div className="sidebar__headerRight"></div>
      </div>
      {/* <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div> */}

      <div className="sidebar__chats">
        {room?.map((item, i) => (
          <SidebarChat
            key={i}
            room={item}
            onClickFunction={onC}
            i={i}
            click={click}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
