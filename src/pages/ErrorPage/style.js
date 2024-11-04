import styled from "styled-components";

export const ErrorMainContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-size: 14px;
  background-color: var(--primary-background-color);

  img {
    width: 250px;
  }

  p {
    text-align: center;
    color: var(--secondary-text-color);
  }

  div {
    display: flex;
    gap: 10px;
  }

  button {
    font-size: 12px;
    height: var(--height35);
    width: var(--width80);
    background-color: var(--primary-color);
    color: #fff;
    border-radius: var(--primary-border-radius);
  }
`;
