import React, { useEffect, useState } from "react";
import { ChatBodyWrapper } from "./style";
import { getUserMessagesData } from "../../services/chat";
import { useSelector } from "react-redux";
import { Data } from "iconsax-react";

function ChatBody() {
  const currentChatUser = useSelector((state) => state.chat.currentChatUser);
  const currentUser = useSelector((state) => state.auth.user);

  const [messagesList, setMessagesList] = useState([]);

  const getMessageData = async () => {
    try {
      const data = await getUserMessagesData(
        currentUser.uid,
        currentChatUser.connectedUserId
      );
      setMessagesList(data);
      console.log("MESSAGE DATA",data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessageData();
  }, []);

  return (
    <ChatBodyWrapper>
      <pre>{JSON.stringify(messagesList, null, 2)}</pre>
    </ChatBodyWrapper>
  );
}

export default ChatBody;
