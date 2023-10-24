import React from "react";
import Chat from "../../components/chats/Chat";
import Sidebar from "../../components/chats/Sidebar";

const Messages = () => {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Messages;
