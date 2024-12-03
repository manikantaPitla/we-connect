import React from "react";
import { ImageSmall } from "../../styles/commonStyles";
import { HiDotsVertical } from "../../assets/icons";
import { HeaderWrapper, MenuWrapper } from "./style";
import { ModalMenu, ModalSmall, ModalViewMedia } from "../../utils/modals";
import { defaultProfileImage } from "../../utils";
import { clearChat } from "../../services";
import { useSelector } from "react-redux";

function ChatHeader({ chatUserData, chatId }) {
  const currentUser = useSelector((state) => state.auth.user);
  const { thumbnailURL, photoURL, userName, connectedUserId } = chatUserData;

  const handleClearChat = async () => {
    try {
      await clearChat(chatId, connectedUserId, currentUser?.userId);
    } catch (error) {
      console.error("error clear chat", error);
    }
  };

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
          <ImageSmall src={photoURL || defaultProfileImage} alt={userName} />
        </ModalViewMedia>
        <div>
          <h5>{userName}</h5>
        </div>
      </div>
      <ModalMenu
        position="bottom right"
        trigger={
          <button type="button">
            <HiDotsVertical />
          </button>
        }
      >
        <MenuWrapper>
          <ModalSmall
            trigger={<li>Clear chat</li>}
            content={{
              title: "Are you sure you want to clear chat?",
              buttonText: "Clear chat",
            }}
            action={handleClearChat}
          ></ModalSmall>
          <li>Chat Info</li>
        </MenuWrapper>
      </ModalMenu>
    </HeaderWrapper>
  );
}

export default React.memo(ChatHeader);
