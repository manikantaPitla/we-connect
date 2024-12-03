import { useDispatch, useSelector } from "react-redux";
import { addCurrentChat, removeCurrentChat } from "../app/features/chatReducer";
import { useSearchParams } from "react-router-dom";
import useChat from "./useChat";

export const useSwitchChat = () => {
  const dispatch = useDispatch();

  const currentChatUser = useSelector((state) => state.chat.currentChatUser);

  const [searchParams, setSearchParams] = useSearchParams();
  const { clearMessages } = useChat();

  const handleSearchParams = (deleteParams = true, chatId, connectedUserId) => {
    const params = new URLSearchParams(searchParams);

    if (deleteParams) {
      params.delete("c_id");
      params.delete("c_u_id");
    } else {
      params.set("c_id", chatId);
      params.set("c_u_id", connectedUserId);
    }

    setSearchParams(params);
  };
  const setCurrentChat = (currentChat) => {
    if (currentChatUser?.chatId === currentChat?.chatId) {
      return;
    }
    clearCurrentChat();

    handleSearchParams(false, currentChat.chatId, currentChat.connectedUserId);
    dispatch(addCurrentChat(currentChat));
  };
  const clearCurrentChat = () => {
    if (currentChatUser === null) return;
    handleSearchParams();
    dispatch(removeCurrentChat());
    dispatch(clearMessages());
  };

  return { setCurrentChat, clearCurrentChat };
};

export default useSwitchChat;
