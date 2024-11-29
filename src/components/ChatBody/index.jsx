import React, { useEffect, useMemo, useRef } from "react";
import {
  ChatBodyWrapper,
  ChatItem,
  ChatMessageItem,
  ChatsWrapper,
  ChatTime,
} from "./style";
import { getUserMessagesData } from "../../services/chat";
import { useSelector } from "react-redux";
import { useChat, useCustomParams, useLoading } from "../../hooks";
import { CircleLoader, ModalViewMedia } from "../../utils";
import AudioPlayer from "../AudioPlayer";
import VideoPlayer from "../VideoPlayer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function ChatBody() {
  const currentUser = useSelector((state) => state.auth.user);
  const messageListData = useSelector((state) => state.messages.messageList);

  const chatContainerScroll = useRef(null);
  const { setMessages } = useChat();
  const { loading, stopLoading } = useLoading(true);
  const { chatId } = useCustomParams();

  useEffect(() => {
    if (!chatId) return;

    const unsubscribe = getUserMessagesData(chatId, setMessages);

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [chatId, setMessages]);

  useEffect(() => {
    if (messageListData.messages.length > 0) {
      stopLoading();
    }
  }, [messageListData.messages.length, stopLoading]);

  useEffect(() => {
    if (chatContainerScroll.current) {
      chatContainerScroll.current.scrollTo({
        top: chatContainerScroll.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messageListData.messages]);

  const RenderImage = ({ media, text, mediaThumbnail }) => {
    return (
      <>
        <ModalViewMedia
          trigger={
            <LazyLoadImage
              //   loading="lazy"
              effect="blur"
              className="image-media"
              src={mediaThumbnail.url}
              alt={mediaThumbnail.name}
            />
          }
        >
          <LazyLoadImage
            effect="blur"
            wrapperProps={{
              // If you need to, you can tweak the effect transition using the wrapper style.
              style: { transitionDelay: "1s" },
            }}
            // loading="lazy"

            src={media.url}
            alt={media.name}
          />
        </ModalViewMedia>

        {text !== null && <p>{text}</p>}
      </>
    );
  };
  const RenderVideo = ({ media, text }) => {
    return (
      <>
        <VideoPlayer videoData={media.url} />
        {text && <p>{text}</p>}
      </>
    );
  };
  const RenderAudio = ({ media }) => {
    return <AudioPlayer audioData={media} />;
  };

  const RenderText = ({ text, messageType }) => {
    return (
      <>
        <p>{text}</p>
        {messageType === "connection" && <p>{messageListData?.createdAt}</p>}
      </>
    );
  };

  const RenderMessagesByType = ({ messageData }) => {
    const { messageType, media, text, mediaThumbnail } = messageData;
    switch (messageType) {
      case "image":
        return (
          <RenderImage
            text={text}
            media={media}
            mediaThumbnail={mediaThumbnail}
          />
        );
      case "audio":
        return <RenderAudio text={text} media={media} />;
      case "video":
        return <RenderVideo media={media} />;
      default:
        return <RenderText text={text} messageType={messageType} />;
    }
  };

  const renderedMessages = useMemo(
    () =>
      messageListData?.messages?.map((message) => {
        const { senderId, messageId, messageType, timestamp } = message;
        return (
          <ChatItem
            key={messageId}
            $connection={messageType === "connection"}
            $sender={senderId === currentUser.userId}
            className={`${
              messageType === "connection" && "connection-message"
            }`}
          >
            <ChatMessageItem $sender={senderId === currentUser.userId}>
              <RenderMessagesByType messageData={message} />
            </ChatMessageItem>
            {messageType !== "connection" && <ChatTime>{timestamp}</ChatTime>}
          </ChatItem>
        );
      }),
    [messageListData?.messages, currentUser?.userId]
  );

  return (
    <ChatBodyWrapper>
      <ChatsWrapper ref={chatContainerScroll}>
        {loading ? (
          <CircleLoader changeColor={true} />
        ) : (
          <>{renderedMessages}</>
        )}
      </ChatsWrapper>
    </ChatBodyWrapper>
  );
}

export default React.memo(ChatBody);
