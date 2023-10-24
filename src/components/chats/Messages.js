import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../firebase-config";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "chats", data.chatId),
      async (docSnapshot) => {
        if (docSnapshot.exists()) {
          setMessages(docSnapshot.data().messages);
          await markMessagesAsRead(docSnapshot.id); // Call the function to update the "read" status
        }
      }
    );

    return () => {
      unSub();
    };
  }, [data.chatId]);

  const markMessagesAsRead = async (chatId) => {
    try {
      const chatRef = doc(db, "chats", chatId);
      await updateDoc(chatRef, {
        messages: messages.map((msg) => ({
          ...msg,
          read: true,
        })),
      });
    } catch (error) {
      console.error("Error updating the read status: ", error);
    }
  };

  console.log(messages);

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
