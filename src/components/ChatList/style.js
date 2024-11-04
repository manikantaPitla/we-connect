import styled from "styled-components";

export const ChatListContainer = styled.ul`
  flex: 1;
  list-style: none;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-right: 5px;

  .active {
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
    height: 50px;
    width: 50px;
    border-radius: 50px;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  .chat-list-user-content {
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
