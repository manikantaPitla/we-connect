import styled from "styled-components";

export const HeaderWrapper = styled.header`
  padding: 10px 20px;
  height: 70px;
  box-shadow: var(--shadow);
  border-radius: var(--primary-border-radius);
  background-color: var(--primary-background-color);
  color: var(--primary-text-color);

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 800px) {
    box-shadow: none;
    border-radius: 0px;
    border-bottom: var(--primary-border);
  }

  .user-chat-profile {
    display: flex;
    align-items: center;
    gap: 10px;

    div {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    h5 {
      font-size: 16px;
      font-weight: 500;
    }

    p {
      font-size: 10px;
      font-weight: 500;
      color: var(--primary);
    }
  }

  svg {
    font-size: 20px;
    color: var(--text-primary);
  }
`;
