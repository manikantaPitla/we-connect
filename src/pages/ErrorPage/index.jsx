import React from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMainContainer } from "./style";
import errorImage from "../../assets/svg/error.svg";

function ErrorPage({ message }) {
  const navigate = useNavigate();
  return (
    <ErrorMainContainer>
      <img src={errorImage} alt="Error" />
      <p>{message}</p>
      <div>
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("auth/signin")}>Sign In</button>
      </div>
    </ErrorMainContainer>
  );
}

export default ErrorPage;
