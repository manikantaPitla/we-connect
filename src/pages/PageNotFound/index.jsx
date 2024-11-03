import React from "react";
import { useNavigate } from "react-router-dom";
import notFoundImage from "../../assets/svg/page-not-found.svg";
import styled from "styled-components";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <NotFoundContainer>
      <img src={notFoundImage} alt="page-not-found" />
      <p>Oops! It seems like you've taken a wrong turn.</p>
      <p>Let's get you back on track</p>
      <button onClick={() => navigate("/")}>Go Home</button>
    </NotFoundContainer>
  );
}

const NotFoundContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-size: 14px;
  background-color: var(--primary-background-color);

  img {
    width: 300px;
  }

  p {
    text-align: center;
    color: var(--secondary-text-color);
  }

  button {
    font-size: 12px;
    height: var(--height35);
    width: var(--width80);
    background-color: var(--primary-color);
    color: #fff;
    border-radius: var(--primary-border-radius);
  }

  @media screen and (min-width: 500px) {
    img {
      width: 400px;
    }
  }
`;

export default PageNotFound;
