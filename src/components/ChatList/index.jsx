import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChatItem, ChatListContainer } from "./style";
import Skeleton from "react-loading-skeleton";
import { getUserChats } from "../../services";
import { useLoading } from "../../hooks";
import ChatListUserItem from "../ChatListUserItem";
function ChatList({ searchVal }) {
  console.log("ChatList");
  const user = useSelector((state) => state.auth.user);
  const [chatList, setChatList] = useState([]);
  const filteredChatList = chatList.filter((chat) =>
    chat.displayName.toLowerCase().includes(searchVal.toLowerCase())
  );

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
      {loading ? (
        <RenderLoading />
      ) : (
        <>
          {filteredChatList.length > 0 ? (
            <>
              {filteredChatList.map((userData) => (
                <ChatListUserItem key={userData.chatId} userData={userData} />
              ))}
            </>
          ) : (
            "No chats"
          )}
        </>
      )}
    </ChatListContainer>
  );
}

export default ChatList;
