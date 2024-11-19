import styled from "styled-components";

export const ChatListContainer = styled.ul`
  flex: 1;
  list-style: none;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  gap: 10px;

  .active-chat {
    border-radius: var(--primary-border-radius);
    background-color: var(--primary-light-color);
  }
`;

export const ChatItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 10px;

  .chat-list-image-container {
  }

  .chat-list-user-content,
  div {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    span {
      width: 100%;
    }

    h1 {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 4px;
    }

    p {
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color);
    }
  }
  p {
    font-size: 10px;
    font-weight: 500;
    color: var(--secondary-text-color);
  }
`;
