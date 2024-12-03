import styled from "styled-components";
import { MainSharedContainer } from "../../styles/commonStyles";

export const ChatBodyWrapper = styled(MainSharedContainer)`
  flex: 1;
  padding: 15px;
  list-style: none;
  overflow-y: auto;
  gap: 10px;
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
    align-items: center !important;
    background-color: var(--secondary-background-color) !important;
    text-align: center;
    color: var(--secondary-text-color) !important;
    font-size: var(--fs-12);
    padding: 10px;
  }
`;
