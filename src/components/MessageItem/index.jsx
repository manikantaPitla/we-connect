import React from "react";
import { ChatItem, ChatItemFlex, ChatMessageItem, ChatTime } from "./style";
import { LazyLoadImage, ModalViewMedia } from "../../utils";
import VideoPlayer from "../VideoPlayer";
import AudioPlayer from "../AudioPlayer";
import { Send2 } from "../../assets/icons";

function MessageItem({ message, userId }) {
  const { senderId, messageId, messageType, timestamp } = message;
  const isSender = senderId === userId;

  const RenderImage = ({ media, text, mediaThumbnail }) => (
    <>
      <ModalViewMedia
        trigger={
          <LazyLoadImage
            effect="blur"
            className="image-media"
            src={mediaThumbnail.url}
            alt={mediaThumbnail.name}
          />
        }
      >
        <LazyLoadImage
          effect="blur"
          wrapperProps={{ style: { transitionDelay: "1s" } }}
          src={media.url}
          alt={media.name}
        />
      </ModalViewMedia>
      {text && <p>{text}</p>}
    </>
  );
  const RenderVideo = ({ media, text }) => (
    <>
      <VideoPlayer videoData={media.url} />
      {text && <p>{text}</p>}
    </>
  );
  const RenderAudio = ({ media }) => <AudioPlayer audioData={media} />;

  const RenderText = ({ text }) => <p>{text}</p>;

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
        return <RenderAudio media={media} />;
      case "video":
        return <RenderVideo media={media} text={text} />;
      default:
        return <RenderText text={text} messageType={messageType} />;
    }
  };

  return (
    <ChatItem
      key={messageId}
      $connection={messageType === "connection"}
      $sender={isSender}
      className={messageType === "connection" ? "connection-message" : ""}
    >
      <ChatItemFlex>
        <ChatMessageItem $sender={isSender} >
          <RenderMessagesByType messageData={message} />
        </ChatMessageItem>
        {message?.status === "sending" && (
          <div className="send-progress">
            <Send2 size={12} />
          </div>
        )}
      </ChatItemFlex>

      {messageType !== "connection" && <ChatTime>{timestamp}</ChatTime>}
    </ChatItem>
  );
}

export default React.memo(MessageItem);
