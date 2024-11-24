import React from "react";
import { useSwitchChat, useWidth } from "../../hooks";
import {
  extractChatUserInfo,
  getTime,
  resizeLastMessage,
} from "../../services";
import defaultProfileImage from "../../assets/images/default-user.webp";
import { ImageSmall } from "../../styles/commonStyles";
import { ChatItem } from "./style";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ChatListUserItem({ userData }) {
  const {
    thumbnailUrl,
    displayName,
    lastMessage,
    lastMessageTimeStamp,
    connectedUserId,
    chatId,
  } = userData;
  console.log("userData:", userData);
  const currentChatUser = useSelector((state) => state.chat.currentChatUser);

  const { setCurrentChat } = useSwitchChat();
  const width = useWidth();
  const navigate = useNavigate();

  const handleChatClick = () => {
    if (width <= 800) {
      navigate(`chat?c_u_id=${connectedUserId}&c_id=${chatId}`);
    } else {
      setCurrentChat(extractChatUserInfo(userData));
    }
  };

  return (
    <ChatItem
      className={`${
        currentChatUser?.connectedUserId === connectedUserId && "active-chat"
      }`}
      onClick={handleChatClick}
    >
      <ImageSmall src={thumbnailUrl || defaultProfileImage} alt={displayName} />
      <div>
        <h5>{displayName}</h5>
        <p>{resizeLastMessage(lastMessage)}</p>
      </div>
      <p>{getTime(lastMessageTimeStamp)}</p>
    </ChatItem>
  );
}

export default ChatListUserItem;
