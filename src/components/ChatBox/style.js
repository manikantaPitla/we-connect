import styled from "styled-components";
import { MainSharedContainer } from "../../styles/commonStyles";

export const ChatBoxWrapper = styled(MainSharedContainer)`
  flex: 1;
  padding: 15px;
  list-style: none;
  overflow-y: auto;
  gap: 10px;
`;

export const DefaultUserContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .mid-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    text-align: center;
    margin-bottom: 100px;

    div {
      width: 150px;
      height: 150px;
      img {
        width: 100%;
      }
    }

    h3 {
        color: var(--primary-color);
    }
    p {
      font-size: 14px;
    }
  }

  /* } */
`;

export const DevContact = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: var(--secondary-text-color);

  p {
    font-size: 12px;
  }

  div {
    display: flex;
    gap: 10px;

    a {
      &:hover {
        color: var(--primary-color);
      }
      svg {
        font-size: 16px;
      }
    }
  }
`;