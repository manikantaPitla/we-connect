import styled from "styled-components";
import { MainSharedContainer } from "../../styles/commonStyles";

export const ChatBoxWrapper = styled.div`
  flex: 1;
  list-style: none;
  gap: 10px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 800px) {
    height: 100vh;
    gap: 0px;
  }
`;

export const DefaultUserContainer = styled(MainSharedContainer)`
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
      width: 100px;
      height: 100px;
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
