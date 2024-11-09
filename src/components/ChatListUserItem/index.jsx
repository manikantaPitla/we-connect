import React from "react";
import { getTime, resizeLastMessage } from "../../services";

import defaultProfileImage from "../../assets/images/default-user.webp";
import { ImageSmall } from "../../styles/commonStyles";
import { ChatItem } from "./style";

function ChatListUserItem({ userData }) {
  console.log(userData);
  const { thumbnailUrl, displayName, lastMessage, lastMessageTimeStamp } =
    userData;

  return (
    <ChatItem>
      <ImageSmall src={thumbnailUrl || defaultProfileImage} alt={displayName} />
      <div>
        <p>{displayName}</p>
        <p>{resizeLastMessage(lastMessage)}</p>
      </div>
      <p>{getTime(lastMessageTimeStamp)}</p>
    </ChatItem>
  );
}

export default ChatListUserItem;
