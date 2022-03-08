import React, { useState, useEffect } from "react";
import Chat from "../Chat/Chat";
import Sidebar from "../Sidebar/Sidebar";
import "./ChatInbox.css";
import { baseUrl } from "../../../config/baseUrl";
import { useSelector } from "react-redux";

const ChatInbox = () => {
  const [messages, setMessages] = useState([]);
  const { user, token } = useSelector((state) => state.user);
  const [senderId, setSenderId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [senderName, setSenderName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState([]);
  const [room, setRoom] = useState([]);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRoomIndex();
  }, [token]);

  // Get Room Api integration
  const getRoomIndex = async () => {
    await fetch(`${baseUrl}/getMyRoomInbox`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        console.log("res2 => get my room sss  inbox", res2);
        setRoom(res2.room);
        // setLoading(false);
      })
      .catch((err) => console.log("err => get my room", err));
  };
  // fetch all messages of room
  const fetchMesagesOfRoom = async (id, sid, rid, sName, rName) => {
    if (user._id == sid) {
      setSenderId(sid);
      setReceiverId(rid);
      setRoomName(rName);
      setSenderName(sName);
      setReceiverName(rName);
    } else {
      setSenderId(rid);
      setReceiverId(sid);
      setRoomName(sName);
      setSenderName(rName);
      setReceiverName(sName);
    }
    setRoomId(id);
    getAllMessages();
    // setSenderName(sName);
    // setReceiverName(rName);
  };

  const clickjust = (i) => {
    const lastArr = [...room];
    const newArr = lastArr.map((item) => {
      return {
        ...item,
        click: false,
      };
    });
    newArr[i].click = true;
    setRoom(newArr);
    // setLoading(true);
  };

  const getAllMessages = async () => {
    const token = localStorage.getItem("token");
    await fetch(`${baseUrl}/messages/all/${roomId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        // setLoading(false);

        console.log("here is res2 ====> ", res2);
        setMessages(res2.messages);
      })
      .catch((err) => console.log("err deleted", err));
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

  return (
    <div className="payment">
      <div className="app__body">
        <Sidebar room={room} onC={fetchMesagesOfRoom} click={clickjust} />
        <Chat
          messages={messages}
          roomId={roomId}
          senderId={senderId}
          receiverId={receiverId}
          senderName={senderName}
          receiverName={receiverName}
          roomName={roomName}
          onClickFunction={fetchMesagesOfRoom}
        />
      </div>
    </div>
  );
};

export default ChatInbox;
