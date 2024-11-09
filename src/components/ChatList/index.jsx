import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChatItem, ChatListContainer } from "./style";
import Skeleton from "react-loading-skeleton";
import { getUserChats } from "../../services";
import { useLoading } from "../../hooks";
import { getTime, resizeLastMessage } from "../../services";

import defaultProfileImage from "../../assets/images/default-user.webp";
import { ImageSmall } from "../../styles/commonStyles";
function ChatList() {
  console.log("ChatList");
  const user = useSelector((state) => state.auth.user);
  const [chatList, setChatList] = useState([]);

  const { loading, stopLoading } = useLoading(true);

  const fetchUserList = async (userId) => {
    try {
      const data = await getUserChats(userId);
      setChatList(data);
    } catch (error) {
      console.error(error);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserList(user.uid);
    }
  }, [user]);

  const RenderLoading = () => (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
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
  );

  return (
    <ChatListContainer>
      {user ? (
        <>
          {" "}
          {loading ? (
            <RenderLoading />
          ) : (
            <>
              {chatList.length > 0 ? (
                <>
                  {chatList.map((userData) => {
                    const {
                      chatId,
                      thumbnailUrl,
                      displayName,
                      lastMessage,
                      lastMessageTimeStamp,
                    } = userData;

                    return (
                      <ChatItem key={chatId}>
                        <ImageSmall
                          src={thumbnailUrl || defaultProfileImage}
                          alt={displayName}
                        />
                        <div>
                          <h1>{displayName}</h1>
                          <p>{resizeLastMessage(lastMessage)}</p>
                        </div>
                        <p>{getTime(lastMessageTimeStamp)}</p>
                      </ChatItem>
                    );
                  })}
                </>
              ) : (
                "No chats"
              )}
            </>
          )}
        </>
      ) : (
        <RenderLoading />
      )}
    </ChatListContainer>
  );
}

export default ChatList;
