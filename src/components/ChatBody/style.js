import styled from "styled-components";
import { MainSharedContainer } from "../../styles/commonStyles";

export const ChatBodyWrapper = styled(MainSharedContainer)`
  flex: 1;
  padding: 15px;
  list-style: none;
  overflow-y: auto;
  gap: 10px;
  /* overflow-x: scroll; */
  display: flex;
`;

export const ChatsWrapper = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow-y: auto;
`;

export const ChatItem = styled.li`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$sender ? "flex-end" : "flex-start")};
`;

export const ChatMessageItem = styled.div`
  background-color: ${(props) =>
    props.$sender
      ? "var(--primary-color)"
      : "var(--secondary-background-color)"};
  padding: 10px;
  border-radius: var(--primary-border-radius);
  color: ${(props) => (props.$sender ? "#fff" : "#000")};
  font-size: 12px;
`;
