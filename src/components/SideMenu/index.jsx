import React from "react";
import { LogoImage, MenuItem, MenuItemsWrapper, SideBarWrapper } from "./style";
import Logo from "../../assets/images/favicon.png";
import { Logout, Messages1, Moon, Sun1 } from "../../assets/icons";
import { useAuthActions, useTheme } from "../../hooks";
import { PopUpModalSmall } from "../PopUp";
import { signOutUser } from "../../services";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function SideMenu() {
  const { pageTheme, changeTheme } = useTheme();
  console.log("Side Menu");

  const navigate = useNavigate();
  const { removeUser } = useAuthActions();
  const user = useSelector((state) => state.auth.user);

  const logout = async () => {
    try {
      if (!user) return;

      await signOutUser();
      removeUser();
      navigate("/auth/signin");
    } catch (error) {
      console.log(error.message);
    }
  };

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
        <PopUpModalSmall
          trigger={
            <MenuItem>
              <Logout />
            </MenuItem>
          }
          content={{
            title: "Are you sure you want to log out?",
            buttonText: "Logout",
          }}
          action={logout}
        />
      </MenuItemsWrapper>
    </SideBarWrapper>
  );
}

export default SideMenu;
