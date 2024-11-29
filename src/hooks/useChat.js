import { useDispatch } from "react-redux";
import { useCallback } from "react";
import {
  setChatMessages,
  addChatMessage,
//   updateChatMessage,
} from "../app/features/messageReducer";

const useChat = () => {
  const dispatch = useDispatch();

  const setMessages = useCallback(
    (messageList) => dispatch(setChatMessages(messageList)),
    [dispatch]
  );

  const addNewMessage = (message) => dispatch(addChatMessage(message));

  return { setMessages, addNewMessage };
};

export default useChat;
