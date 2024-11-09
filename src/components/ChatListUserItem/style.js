import styled from "styled-components";

export const ChatItem = styled.li`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px;

  div {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  p {
    font-size: 12px;
  }
`;
