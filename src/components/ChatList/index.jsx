import React, { useEffect, useState, useMemo, useCallback } from "react";
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

  const { loading, stopLoading } = useLoading(true);

  useEffect(() => {
    if (!user?.userId) return;

    const fetchUserChats = async () => {
      try {
        await getUserChats(user.userId, setChatList);
      } catch (error) {
        console.error("Error fetching user chats:", error);
      } finally {
        stopLoading();
      }
    };

    fetchUserChats();
  }, [user?.userId]);

  const filteredChatList = useMemo(
    () =>
      chatList?.filter((chat) =>
        chat.userName.toLowerCase().includes(searchVal.toLowerCase())
      ),
    [chatList, searchVal]
  );

  const RenderLoading = useCallback(
    () => (
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
    ),
    []
  );

  return (
    <ChatListContainer>
      {loading ? (
        <RenderLoading />
      ) : (
        <>
          {filteredChatList?.length > 0
            ? filteredChatList.map((userData) => (
                <ChatListUserItem key={userData.chatId} userData={userData} />
              ))
            : "No chats"}
        </>
      )}
    </ChatListContainer>
  );
}

export default React.memo(ChatList);
