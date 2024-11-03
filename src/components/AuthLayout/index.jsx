import React from "react";
import {
  AuthContainer,
  FormContainer,
  ImageWrapper,
  LogoWrapper,
} from "./styles";
import Logo from "../../assets/images/favicon.png";
import { Outlet } from "react-router-dom";

import mainPoster from "../../assets/images/main-poster.webp";

function AuthLayout() {
  return (
    <AuthContainer>
      <ImageWrapper>
        <img src={mainPoster} alt="chat banner" loading="lazy" />
      </ImageWrapper>
      <FormContainer>
        <LogoWrapper>
          <img src={Logo} alt="we connect logo" />
          <h1>
            We <span>Connect</span>
          </h1>
        </LogoWrapper>
        <Outlet />
      </FormContainer>
    </AuthContainer>
  );
}

export default AuthLayout;
