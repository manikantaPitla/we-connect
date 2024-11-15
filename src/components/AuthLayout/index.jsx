import React from "react";
import {
  AuthContainer,
  FormWrapper,
  ImageWrapper,
  LogoWrapper,
  ThemeWrapper,
} from "./styles";
import Logo from "../../assets/images/favicon.png";
import { Outlet } from "react-router-dom";
import { Sun1, Moon } from "../../assets/icons";
import mainPoster from "../../assets/images/main-poster.webp";
import { useTheme } from "../../hooks";

function AuthLayout() {
  const { pageTheme, changeTheme } = useTheme();

  return (
    <AuthContainer>
      <ImageWrapper>
        <img src={mainPoster} alt="chat banner" loading="lazy" />
      </ImageWrapper>
      <FormWrapper>
        <LogoWrapper>
          <img src={Logo} alt="we connect logo" />
          <h1>
            We <span>Connect</span>
          </h1>
        </LogoWrapper>
        <Outlet />
      </FormWrapper>
      <ThemeWrapper type="button" onClick={changeTheme}>
        {pageTheme.isDarkModeOn ? <Moon color="#fff" /> : <Sun1 />}
      </ThemeWrapper>
    </AuthContainer>
  );
}

export default AuthLayout;
