import React, { useCallback, useEffect, useRef, useState, memo } from "react";
import {
  ChatInputWrapper,
  ChatInputElement,
  ChatSubmitButton,
  ButtonElement,
  MediaOptionsWrapper,
  PreviewFile,
} from "./style";
import {
  Send,
  AttachSquare,
  Image,
  Video,
  Music,
  Play,
} from "../../assets/icons";
import { ModalMenu, ModalViewMedia } from "../../utils/modals";
import { useSelector } from "react-redux";
import { sendMessage } from "../../services";
import { useChat, useCustomParams, useLoading } from "../../hooks";

const RenderMediaOptions = memo(({ handleFileChange, closeModalMenu }) => {
  const mediaOptionsList = [
    { mediaName: "image", mediaIcon: <Image /> },
    { mediaName: "video", mediaIcon: <Video /> },
    { mediaName: "audio", mediaIcon: <Music /> },
  ];

  return (
    <MediaOptionsWrapper>
      {mediaOptionsList.map(({ mediaName, mediaIcon }) => (
        <div key={mediaName}>
          <input
            type="file"
            id={mediaName}
            name={mediaName}
            accept={`${mediaName}/*`}
            onChange={(e) => {
              handleFileChange(e);
              closeModalMenu();
            }}
          />
          <label htmlFor={mediaName}>{mediaIcon}</label>
        </div>
      ))}
    </MediaOptionsWrapper>
  );
});

const RenderMediaPreview = memo(({ file, filePreview, clearMedia }) => {
  if (!file || !filePreview) return null;

  const mediaPreviewContent = (() => {
    if (file.type.startsWith("image/")) {
      return <img src={filePreview} className="preview-image" alt="preview" />;
    }
    if (file.type.startsWith("video/")) {
      return <Play />;
    }
    if (file.type.startsWith("audio/")) {
      return <Music />;
    }
    return null;
  })();

  const mediaContent = (() => {
    if (file.type.startsWith("image/")) {
      return <img src={filePreview} alt="preview" />;
    }
    if (file.type.startsWith("video/")) {
      return (
        <video className="preview-video" controls>
          <source src={filePreview} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }
    if (file.type.startsWith("audio/")) {
      return (
        <audio controls>
          <source src={filePreview} type="audio/ogg" />
          Your browser does not support the audio element.
        </audio>
      );
    }
    return null;
  })();

  return (
    <ModalViewMedia
      action={clearMedia}
      trigger={<PreviewFile type="button">{mediaPreviewContent}</PreviewFile>}
    >
      {mediaContent}
    </ModalViewMedia>
  );
});

function ChatInput() {
  console.log("Chat Input");
  const initialChatData = { message: "", file: null, filePreview: null };
  const [chatData, setChatData] = useState(initialChatData);
  const [mediaUploadingStatus, setMediaUploadingStatus] = useState("");

  const currentChatUser = useSelector((state) => state.chat.currentChatUser);
  const currentUser = useSelector((state) => state.auth.user);

  const { addNewMessage, updateMessage } = useChat();
  const { connectedUserId } = useCustomParams();
  const { loading, startLoading, stopLoading } = useLoading(false);

  const messageInputRef = useRef(null);
  const modalMenuRef = useRef(null);

  useEffect(() => {
    setChatData(initialChatData);
    return () => setChatData(initialChatData);
  }, [currentChatUser]);

  const handleInputChange = useCallback((e) => {
    setChatData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    const filePreview = URL.createObjectURL(file);
    setChatData((prev) => {
      if (prev.filePreview) {
        URL.revokeObjectURL(prev.filePreview);
      }
      return { ...prev, file, filePreview };
    });
  }, []);

  const clearMedia = useCallback(() => {
    setChatData((prev) => ({ ...prev, file: null, filePreview: null }));
  }, []);

  const handleSendMessage = useCallback(
    async (e) => {
      e.preventDefault();
      messageInputRef.current.focus();

      const { message, file } = chatData;
      if (!message && !file) return;

      startLoading();
      try {
        await sendMessage(
          currentUser.userId,
          connectedUserId,
          chatData,
          setMediaUploadingStatus,
          addNewMessage,
          updateMessage
        );
        setChatData(initialChatData);
        setMediaUploadingStatus("");
      } catch (error) {
        console.error(error);
      } finally {
        stopLoading();
      }
    },
    [
      chatData,
      addNewMessage,
      currentUser.userId,
      connectedUserId,
      startLoading,
      stopLoading,
    ]
  );

  const closeModalMenu = useCallback(() => modalMenuRef.current.close(), []);

  return (
    <ChatInputWrapper onSubmit={handleSendMessage}>
      <ChatInputElement
        ref={messageInputRef}
        name="message"
        placeholder="Type your message here..."
        value={chatData.message}
        onChange={handleInputChange}
      />
      {mediaUploadingStatus && <div>{mediaUploadingStatus}</div>}
      <RenderMediaPreview
        file={chatData.file}
        filePreview={chatData.filePreview}
        clearMedia={clearMedia}
      />
      <ModalMenu
        ref={modalMenuRef}
        position="top right"
        trigger={
          <ButtonElement type="button">
            <AttachSquare />
          </ButtonElement>
        }
      >
        <RenderMediaOptions
          handleFileChange={handleFileChange}
          closeModalMenu={closeModalMenu}
        />
      </ModalMenu>
      <ChatSubmitButton type="submit" disabled={loading}>
        <Send />
      </ChatSubmitButton>
    </ChatInputWrapper>
  );
}

export default memo(ChatInput);
