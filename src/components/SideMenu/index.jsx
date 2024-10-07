import React from "react";
import { SideBarWrapper } from "./style";
import Logo from "../../assets/images/logo.svg";

function SideMenu() {
  return (
    <SideBarWrapper>
      <div>
        <img src={Logo} alt="we connect logo" loading="lazy" />
      </div>
    </SideBarWrapper>
  );
}

export default SideMenu;
