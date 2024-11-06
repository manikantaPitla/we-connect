import React from "react";
import { useSelector } from "react-redux";
import { ChatItem, ChatListContainer } from "./style";
import Skeleton from "react-loading-skeleton";

function ChatList() {
  console.log("ChatList");
  const user = useSelector((state) => state.auth.user);

  return (
    <ChatListContainer>
      {user ? (
        <div>user list</div>
      ) : (
        <>
          {Array.from({ length: 6 }).map((_, index) => (
            <ChatItem key={index}>
              <div className="chat-list-image-container">
                <Skeleton circle height={50} width={50} />
              </div>
              <div className="chat-list-user-content">
                <Skeleton />
                <Skeleton />
              </div>
              <Skeleton width={50} />
            </ChatItem>
          ))}
        </>
      )}
    </ChatListContainer>
  );
}

export default ChatList;
