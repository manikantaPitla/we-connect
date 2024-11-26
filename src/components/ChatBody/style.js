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

  @media screen and (max-width: 800px) {
    border: none;
    border-radius: 0px;
    box-shadow: none;
  }
`;

export const ChatsWrapper = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow-y: auto;
  gap: 10px;

  .connection-message {
    justify-content: center !important;
    background-color: var(--secondary-background-color) !important;

    div {
      background-color: transparent !important;
      text-align: center;
    }
  }
`;

export const ChatItem = styled.li`
  display: flex;
  align-items: ${(props) => (props.$sender ? "flex-end" : "flex-start")};
  flex-direction: column;
  gap: 3px;
  justify-content: center;
`;

export const ChatMessageItem = styled.div`
  background-color: ${(props) =>
    props.$sender
      ? "var(--primary-color)"
      : "var(--secondary-background-color)"};
  padding: 10px;
  border-radius: var(--primary-border-radius);
  color: ${(props) => (props.$sender ? "#fff" : "var(--primary-text-color)")};

  p {
    font-size: 12px;
  }

  border-bottom-left-radius: ${(props) => (props.$sender ? "none" : "0px")};
  border-bottom-right-radius: ${(props) => (props.$sender ? "0px" : "none")};
`;

export const ChatTime = styled.p`
  font-size: 10px;
`;
