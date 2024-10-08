import React from "react";
import { LogoImage, MenuItem, MenuItemsWrapper, SideBarWrapper } from "./style";
import Logo from "../../assets/images/favicon.png";
import { Logout, Messages1, Moon, Sun1 } from "../../assets/icons";
import { useTheme } from "../../hooks";

function SideMenu() {
  const { pageTheme, changeTheme } = useTheme();

  return (
    <SideBarWrapper>
      <LogoImage src={Logo} alt="we connect logo" loading="lazy" />
      <MenuItemsWrapper>
        <MenuItem className="active">
          <Messages1 />
        </MenuItem>
        <MenuItem onClick={changeTheme}>
          {pageTheme?.isDarkModeOn ? <Sun1 /> : <Moon />}
        </MenuItem>
        <MenuItem>
          <Logout />
        </MenuItem>
      </MenuItemsWrapper>
    </SideBarWrapper>
  );
}

export default SideMenu;
