import { useDispatch } from "react-redux";
import { addCurrentChat, removeCurrentChat } from "../app/features/chatReducer";

export const useSwitchChat = () => {
  const dispatch = useDispatch();

  const setCurrentChat = (currentChat) => dispatch(addCurrentChat(currentChat));
  const clearCurrentChat = () => dispatch(removeCurrentChat());

  return { setCurrentChat, clearCurrentChat };
};

export default useSwitchChat;
