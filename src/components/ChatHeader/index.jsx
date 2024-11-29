import React from "react";
import { ImageSmall } from "../../styles/commonStyles";
import { HiDotsVertical } from "../../assets/icons";
import { HeaderWrapper } from "./style";
import { ModalViewMedia } from "../../utils/modals";
import { defaultProfileImage } from "../../utils";

function ChatHeader({ chatUserData }) {
  const { thumbnailURL, photoURL, userName } = chatUserData;
  console.log("Chat Header");
  return (
    <HeaderWrapper>
      <div className="user-chat-profile">
        <ModalViewMedia
          trigger={
            <ImageSmall
              src={thumbnailURL || defaultProfileImage}
              alt={userName}
            />
          }
        >
          <img src={photoURL || defaultProfileImage} alt={userName} />
        </ModalViewMedia>
        <div>
          <h5>{userName}</h5>
        </div>
      </div>
      <button type="button">
        <HiDotsVertical />
      </button>
    </HeaderWrapper>
  );
}

export default React.memo(ChatHeader);
