import React, { memo, useEffect, useState } from "react";
import { ChatBoxWrapper, DefaultUserContainer, DevContact } from "./style";
import { useSelector } from "react-redux";
import pageLogoImage from "../../assets/images/favicon.png";
import { FaGithub, FaLinkedin } from "../../assets/icons";
import ChatHeader from "../ChatHeader";
import ChatBody from "../ChatBody";
import ChatInput from "../ChatInput";
import { useCustomParams, useWidth } from "../../hooks";
import { getUserProfileData } from "../../services";
import { CircleLoader } from "../../utils/loaders";

function ChatBox() {
  console.log("ChatBox");
  const user = useSelector((state) => state.auth.user);
  const chatUser = useSelector((state) => state.chat.currentChatUser);

  const width = useWidth();
  const { connectedUserId } = useCustomParams();
  const [currentChatUser, setCurrentChatUser] = useState(null);

  useEffect(() => {
    const fetchChatUser = async () => {
      try {
        const fetchedUser = await getUserProfileData(connectedUserId);
        console.log("dasds", fetchChatUser);
        setCurrentChatUser(fetchedUser);
      } catch (err) {
        setCurrentChatUser(null);
        console.error("Error fetching chat user:", err);
      }
    };

    if (width <= 800) {
      fetchChatUser();
    } else {
      setCurrentChatUser(chatUser);
    }
  }, [width, connectedUserId, chatUser]);

  return (
    <ChatBoxWrapper>
      {currentChatUser ? (
        <>
          <ChatHeader chatUserData={currentChatUser} />
          <ChatBody />
          <ChatInput />
        </>
      ) : (
        <>
          {width <= 800 ? (
            <CircleLoader />
          ) : (
            <DefaultUserContainer>
              <div className="mid-container">
                <div>
                  <img
                    src={pageLogoImage}
                    alt="We Connect Logo"
                    loading="lazy"
                  />
                </div>
                <h3>We Connect</h3>
                <p>
                  Hey {user.displayName} !, Lets get ready to chat with our
                  loved one's .
                </p>
              </div>
              <DevContact>
                <p>Checkout developer's profile</p>
                <div>
                  <a
                    href="https://www.linkedin.com/in/manikanta8/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="https://github.com/manikantaPitla"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaGithub />
                  </a>
                </div>
              </DevContact>
            </DefaultUserContainer>
          )}
        </>
      )}
    </ChatBoxWrapper>
  );
}

export default memo(ChatBox);
