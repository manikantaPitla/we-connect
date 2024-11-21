import React, { useEffect, useMemo, useRef } from "react";
import {
  ChatBodyWrapper,
  ChatItem,
  ChatMessageItem,
  ChatsWrapper,
} from "./style";
import { getUserMessagesData } from "../../services/chat";
import { useSelector } from "react-redux";
import { useChat } from "../../hooks";

function ChatBody() {
  const currentChatUser = useSelector((state) => state.chat.currentChatUser);
  const currentUser = useSelector((state) => state.auth.user);
  const messageListData = useSelector((state) => state.messages.messageList);

  const chatContainerScroll = useRef(null);

  const { setMessages } = useChat();

  // Fetch messages when the current chat changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (currentUser?.uid && currentChatUser?.connectedUserId) {
        try {
          await getUserMessagesData(
            currentUser.uid,
            currentChatUser.connectedUserId,
            setMessages
          );
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    fetchMessages();
  }, [currentUser?.uid, currentChatUser?.connectedUserId, setMessages]);

  // Memoized messages list to avoid unnecessary recalculations
  const messagesList = useMemo(() => messageListData || {}, [messageListData]);

  // Auto-scroll to the bottom of the chat container when messages change
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
            const { text, media, senderId, id } = message;
            return (
              <ChatItem key={id} $sender={senderId === currentUser.uid}>
                <ChatMessageItem $sender={senderId === currentUser.uid}>
                  {text}
                </ChatMessageItem>
                {media && <img src={media} alt="Media content" />}
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
