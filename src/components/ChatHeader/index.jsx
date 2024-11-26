import React from "react";
import { ImageSmall } from "../../styles/commonStyles";
import defaultProfileImage from "../../assets/images/default-user.webp";
import { HiDotsVertical } from "../../assets/icons";
import { HeaderWrapper } from "./style";
import { ModalViewMedia } from "../../utils/modals";

function ChatHeader({ chatUserData }) {
  const { thumbnailUrl, photoURL, displayName } = chatUserData;
  console.log("Chat Header");
  return (
    <HeaderWrapper>
      <div className="user-chat-profile">
        <ModalViewMedia
          trigger={
            <ImageSmall
              src={thumbnailUrl || defaultProfileImage}
              alt={displayName}
            />
          }
        >
          <img src={photoURL || defaultProfileImage} alt={displayName} />
        </ModalViewMedia>
        <div>
          <h5>{displayName}</h5>
        </div>
      </div>
      <button type="button">
        <HiDotsVertical />
      </button>
    </HeaderWrapper>
  );
}

export default ChatHeader;
