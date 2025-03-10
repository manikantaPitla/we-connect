import React, { useEffect, useMemo, useRef } from "react";
import { ChatBodyWrapper, ChatsWrapper } from "./style";
import { getUserMessagesData } from "../../services/chat";
import { useSelector } from "react-redux";
import { useChat, useCustomParams, useLoading } from "../../hooks";
import { CircleLoader } from "../../utils";

import MessageItem from "../MessageItem";

function ChatBody() {
  console.log("ChatBody");
  const currentUser = useSelector((state) => state.auth.user);
  const messageListData = useSelector((state) => state.messages.messageList);

  const chatContainerRef = useRef(null);
  const { setMessages } = useChat();
  const { loading, stopLoading } = useLoading(true);
  const { chatId } = useCustomParams();

  useEffect(() => {
    if (!chatId) return;

    const unsubscribe = getUserMessagesData(chatId, setMessages);
    stopLoading();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [chatId, setMessages]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messageListData.messages]);

  const renderedMessages = useMemo(() => {
    return (    
      <>
        {messageListData?.chatInfo && (
          <div className="connection-message">
            <p>You are now connected</p>
            <p>{messageListData.chatInfo.createdAt}</p>
          </div>
        )}
        {messageListData?.messages?.map((message) => {
          return (
            <MessageItem
              key={message.messageId}
              message={message}
              userId={currentUser?.userId}
            />
          );
        })}
      </>
    );
  }, [messageListData?.messages, currentUser?.userId]);

  return (
    <ChatBodyWrapper>
      <ChatsWrapper ref={chatContainerRef}>
        {loading ? <CircleLoader changeColor /> : renderedMessages}
      </ChatsWrapper>
    </ChatBodyWrapper>
  );
}

export default React.memo(ChatBody);
