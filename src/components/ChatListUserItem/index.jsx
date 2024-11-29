import React from "react";
import { useSwitchChat, useWidth } from "../../hooks";
import {
  extractChatUserInfo,
  getTime,
  resizeLastMessage,
} from "../../services";
import { ImageSmall } from "../../styles/commonStyles";
import { ChatItem } from "./style";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { defaultProfileImage } from "../../utils";

function ChatListUserItem({ userData }) {
  const {
    thumbnailURL,
    userName,
    lastMessage,
    lastMessageTimeStamp,
    connectedUserId,
    chatId,
  } = userData;

  const currentChatUser = useSelector((state) => state.chat.currentChatUser);

  const { clearCurrentChat, setCurrentChat } = useSwitchChat();
  const width = useWidth();
  const navigate = useNavigate();

  const handleChatClick = () => {
    if (width <= 800) {
      clearCurrentChat();
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
      <ImageSmall src={thumbnailURL || defaultProfileImage} alt={userName} />
      <div>
        <h5>{userName}</h5>
        <p>{resizeLastMessage(lastMessage)}</p>
      </div>
      <p>{getTime(lastMessageTimeStamp)}</p>
    </ChatItem>
  );
}

export default React.memo(ChatListUserItem);
