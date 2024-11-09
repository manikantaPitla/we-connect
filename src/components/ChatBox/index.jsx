import React, { memo } from "react";
import { ChatBoxWrapper, DefaultUserContainer, DevContact } from "./style";
import { useSelector } from "react-redux";
import pageLogoImage from "../../assets/images/favicon.png";
import { FaGithub, FaLinkedin } from "../../assets/icons";
import Skeleton from "react-loading-skeleton";

function ChatBox() {
  const user = useSelector((state) => state.auth.user);
  console.log("ChatBox");

  return (
    <ChatBoxWrapper>
      {user ? (
        <DefaultUserContainer>
          <div className="mid-container">
            <div>
              <img
                src={pageLogoImage}
                alt="We Connect Logo"
                loading="lazy"
                //   onError={handleErrImage}
              />
            </div>
            <h3>We Connect</h3>
            <p>
              Hey {user.displayName} !, Lets get ready to chat with our loved
              one's .
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
      ) : (
        <DefaultUserContainer>
          <div></div>
          <div className="mid-container">
            <Skeleton height={150} width={150} circle />
            <Skeleton width={150} />
            <Skeleton width={300} />
          </div>
          <DevContact>
            <Skeleton width={200} height={8} />
            <div>
              <Skeleton height={15} width={15} />
              <Skeleton height={15} width={15} />
            </div>
          </DevContact>
        </DefaultUserContainer>
      )}
    </ChatBoxWrapper>
  );
}

export default memo(ChatBox);
