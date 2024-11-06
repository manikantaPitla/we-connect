import React, { memo } from "react";
import {
  LogoImage,
  MenuItem,
  MenuItemsWrapper,
  SideMenuWrapper,
  SkeletonMenu,
} from "./style";
import Logo from "../../assets/images/favicon.png";
import {
  Logout,
  Messages1,
  Moon,
  Sun1,
  Profile2User,
} from "../../assets/icons";
import { useAuthActions, useTheme } from "../../hooks";
import { PopUpModalSmall } from "../PopUp";
import { showError, signOutUser } from "../../services";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const tabItems = [
  {
    name: "Chats",
    icon: Messages1,
  },
  {
    name: "Connections",
    icon: Profile2User,
  },
];

function SideMenu({ tabActions }) {
  const { pageTheme, changeTheme } = useTheme();
  console.log("Side Menu");

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { removeUser } = useAuthActions();

  const logout = async () => {
    try {
      if (!user) return;

      await signOutUser();
      removeUser();
      navigate("/auth/signin");
    } catch (error) {
      showError(error.message);
    }
  };

  return (
    <SideMenuWrapper>
      {user ? (
        <>
          <LogoImage src={Logo} alt="we connect logo" loading="lazy" />
          <MenuItemsWrapper>
            {tabItems.map((eachItem) => (
              <MenuItem
                className={`${
                  tabActions.currentTab === eachItem.name && "active"
                }`}
                onClick={() => tabActions.onChangeCurrentTab(eachItem.name)}
                key={eachItem.name}
              >
                <eachItem.icon />
              </MenuItem>
            ))}
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
        </>
      ) : (
        <>
          <Skeleton height={50} width={50} circle />
          <SkeletonMenu>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </SkeletonMenu>
        </>
      )}
    </SideMenuWrapper>
  );
}

export default memo(SideMenu);
