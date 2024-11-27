import React, { useEffect, useMemo, useRef } from "react";
import {
  ChatBodyWrapper,
  ChatItem,
  ChatMessageItem,
  ChatsWrapper,
  ChatTime,
} from "./style";
import { getUserMessagesData } from "../../services/chat";
import { useSelector } from "react-redux";
import { useChat, useCustomParams } from "../../hooks";
import { getDateTime, getTime } from "../../services/user";

function ChatBody() {
  const currentUser = useSelector((state) => state.auth.user);
  const messageListData = useSelector((state) => state.messages.messageList);

  const chatContainerScroll = useRef(null);

  const { setMessages } = useChat();

  const { connectedUserId, chatId } = useCustomParams();

  useEffect(() => {
    const fetchMessages = async () => {
      if (currentUser?.userId && connectedUserId) {
        try {
          await getUserMessagesData(chatId, setMessages);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    fetchMessages();
  }, [currentUser?.userId, connectedUserId, setMessages]);

  const messagesList = useMemo(() => messageListData || {}, [messageListData]);

  useEffect(() => {
    if (chatContainerScroll.current) {
      chatContainerScroll.current.scrollTo({
        top: chatContainerScroll.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messagesList]);

  return (
    <ChatBodyWrapper>
      <ChatsWrapper ref={chatContainerScroll}>
        {messagesList?.messages?.length > 0 ? (
          messagesList.messages.map((message) => {
            const { text, media, senderId, messageId, messageType, timestamp } =
              message;
            return (
              <ChatItem
                key={messageId}
                $connection={messageType === "connection"}
                $sender={senderId === currentUser.userId}
                className={`${
                  messageType === "connection" && "connection-message"
                }`}
              >
                {messageType !== "connection" ? (
                  <>
                    <ChatMessageItem $sender={senderId === currentUser.userId}>
                      <p>{text}</p>
                    </ChatMessageItem>
                    <ChatTime>{getTime(timestamp)}</ChatTime>
                    {media && (
                      <img
                        className="image-media"
                        src={media}
                        alt="Media content"
                      />
                    )}
                  </>
                ) : (
                  <ChatMessageItem>
                    <p> {getDateTime(messagesList.createdAt)}</p>
                    <p>{text}</p>
                  </ChatMessageItem>
                )}
              </ChatItem>
            );
          })
        ) : (
          <p>No messages yet.</p>
        )}
      </ChatsWrapper>
    </ChatBodyWrapper>
  );
}

export default React.memo(ChatBody);
