import { useDispatch, useSelector } from "react-redux";
import { addCurrentChat, removeCurrentChat } from "../app/features/chatReducer";
import { useSearchParams } from "react-router-dom";

export const useSwitchChat = () => {
  const dispatch = useDispatch();

  const currentChatUser = useSelector((state) => state.chat.currentChatUser);

  const [searchParams, setSearchParams] = useSearchParams();

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
    handleSearchParams(false, currentChat.chatId, currentChat.connectedUserId);
    dispatch(addCurrentChat(currentChat));
  };
  const clearCurrentChat = () => {
    if (!currentChatUser) return;
    handleSearchParams();
    dispatch(removeCurrentChat());
  };

  return { setCurrentChat, clearCurrentChat };
};

export default useSwitchChat;
