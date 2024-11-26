import React, { useCallback, useEffect, useRef, useState } from "react";
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
  //   MusicPlay,
} from "../../assets/icons";
import { ModalMenu, ModalViewMedia } from "../../utils/modals";
import { useSelector } from "react-redux";
import { sendMessage } from "../../services";
import { useChat, useCustomParams, useLoading } from "../../hooks";

function ChatInput() {
  console.log("ChatInput");

  const initialChatData = {
    message: "",
    file: null,
    filePreview: null,
  };

  const [chatData, setChatData] = useState(initialChatData);
  const [mediaUploadingStatus, setMediaUploadingStatus] = useState("");

  const currentChatUser = useSelector((state) => state.chat.currentChatUser);
  const currentUser = useSelector((state) => state.auth.user);

  const { addNewMessage } = useChat();
  const messageInputRef = useRef(null);

  const modalMenuRef = useRef(null);
  const closeModalMenu = () => modalMenuRef.current.close();

  const { loading, stopLoading, startLoading } = useLoading(false);

  const { connectedUserId } = useCustomParams();

  useEffect(() => {
    setChatData(initialChatData);

    return () => setChatData(initialChatData);
  }, [currentChatUser]);

  const handleInputChange = useCallback((e) => {
    setChatData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const filePreview = URL.createObjectURL(file);

      setChatData((prev) => {
        if (prev.filePreview) {
          URL.revokeObjectURL(prev.filePreview);
        }
        return {
          ...prev,
          file,
          filePreview,
        };
      });

      closeModalMenu();
    },

    [chatData.filePreview]
  );

  const clearMedia = () => {
    setChatData((prev) => ({ ...prev, file: null, filePreview: null }));
  };

  const handleSendMessage = useCallback(
    async (e) => {
      e.preventDefault();
      messageInputRef.current.focus();

      const { message, file } = chatData;

      console.log("starting....");
      if (!message && !file) return;
      startLoading();
      console.log("verified....");

      console.log(chatData);
      try {
        await sendMessage(
          currentUser.uid,
          connectedUserId,
          chatData,
          setMediaUploadingStatus,
          addNewMessage
        );
      } catch (error) {
        console.log(error);
      } finally {
        setChatData(initialChatData);
        setMediaUploadingStatus("");
        stopLoading();
      }
    },
    [chatData]
  );

  const RenderMediaOptions = () => {
    const mediaOptionsList = [
      {
        mediaName: "image",
        mediaIcon: <Image />,
      },
      {
        mediaName: "video",
        mediaIcon: <Video />,
      },
      {
        mediaName: "audio",
        mediaIcon: <Music />,
      },
    ];

    return (
      <MediaOptionsWrapper>
        {mediaOptionsList.map((option, index) => {
          const { mediaName, mediaIcon } = option;
          return (
            <div key={index}>
              <input
                type="file"
                id={mediaName}
                name={mediaName}
                accept={`${mediaName}/*`}
                onChange={handleFileChange}
              />
              <label htmlFor={mediaName}>{mediaIcon}</label>
            </div>
          );
        })}
      </MediaOptionsWrapper>
    );
  };

  const RenderMediaPreview = () => {
    const { file, filePreview } = chatData;

    if (!file || !filePreview) return null;

    if (file.type.startsWith("image/")) {
      return (
        <ModalViewMedia
          action={clearMedia}
          trigger={
            <PreviewFile type="button">
              <img
                src={filePreview}
                className="preview-image"
                alt="preview image"
              />
            </PreviewFile>
          }
        >
          <img src={filePreview} />
        </ModalViewMedia>
      );
    }

    if (file.type.startsWith("video/")) {
      return (
        <ModalViewMedia
          action={clearMedia}
          trigger={
            <PreviewFile type="button">
              <Play />
            </PreviewFile>
          }
        >
          <video className="preview-video" autoPlay={false} controls>
            <source src={filePreview} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </ModalViewMedia>
      );
    }

    if (file.type.startsWith("audio/")) {
      return (
        <ModalViewMedia
          action={clearMedia}
          trigger={
            <PreviewFile type="button">
              <Music />
            </PreviewFile>
          }
        >
          <audio controls>
            <source src={filePreview} type="audio/ogg" />
            Your browser does not support the audio element.
          </audio>
        </ModalViewMedia>
      );
    }
  };

  return (
    <ChatInputWrapper onSubmit={handleSendMessage}>
      <ChatInputElement
        ref={messageInputRef}
        type="input"
        name="message"
        placeholder="Type your message here..."
        value={chatData.message}
        onChange={handleInputChange}
      />
      {mediaUploadingStatus}
      <RenderMediaPreview />
      <ModalMenu
        ref={modalMenuRef}
        position="top right"
        offsetY={20}
        trigger={
          <ButtonElement type="button">
            <AttachSquare />
          </ButtonElement>
        }
      >
        <RenderMediaOptions />
      </ModalMenu>
      <ChatSubmitButton type="submit" disabled={loading}>
        <Send />
      </ChatSubmitButton>
    </ChatInputWrapper>
  );
}

export default ChatInput;
