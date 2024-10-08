import React from "react";
import {
  AuthContainer,
  FormContainer,
  ImageWrapper,
  LogoWrapper,
} from "./styles";
import BgImage from "../../assets/images/bg-image.jpg";
import Logo from "../../assets/images/favicon.png";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <AuthContainer>
      <ImageWrapper>
        <img src={BgImage} alt="chat background" />
      </ImageWrapper>
      <FormContainer>
        <LogoWrapper>
          <img src={Logo} width={60} alt="we connect logo" />
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
