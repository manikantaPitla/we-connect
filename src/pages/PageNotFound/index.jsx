import React from "react";
import { useNavigate } from "react-router-dom";
import notFoundImage from "../../assets/svg/page-not-found.svg";
import { NotFoundContainer } from "./styles";

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

export default PageNotFound;
