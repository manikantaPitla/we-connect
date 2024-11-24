import React, { memo } from "react";
import {
  MenuContent,
  MenuIcons,
  MenuItem,
  MenuItemsWrapper,
  SideMenuWrapper,
} from "./style";
import Logo from "../../assets/images/favicon.png";
import {
  Logout,
  Messages1,
  Moon,
  Sun1,
  Profile2User,
} from "../../assets/icons";
import { useAuthActions, useSwitchChat, useTheme } from "../../hooks";
import { ModalSmall } from "../../utils";
import { showError, signOutAuth } from "../../services";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import defaultProfileImage from "../../assets/images/default-user.webp";
import "react-loading-skeleton/dist/skeleton.css";
import { ImageSmall } from "../../styles/commonStyles";

function SideMenu({ tabActions }) {
  const { pageTheme, changeTheme } = useTheme();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { removeUser } = useAuthActions();
  const { clearCurrentChat } = useSwitchChat();

  const tabItems = [
    {
      tabName: "Profile",
      profileUrl: user?.thumbnailUrl || defaultProfileImage,
      tabIcon: null,
      action: () => tabActions.onChangeCurrentTab("Profile"),
    },
    {
      tabName: "Chats",
      tabIcon: Messages1,
      action: () => tabActions.onChangeCurrentTab("Chats"),
    },
    {
      tabName: "Connections",
      tabIcon: Profile2User,
      action: () => tabActions.onChangeCurrentTab("Connections"),
    },
    {
      tabName: pageTheme.isDarkModeOn ? "Light Mode" : "Dark Mode",
      tabIcon: pageTheme.isDarkModeOn ? Sun1 : Moon,
      action: changeTheme,
    },
  ];

  const logout = async () => {
    try {
      if (!user) return;
      await signOutAuth();
      removeUser();
      navigate("/auth/signin");
    } catch (error) {
      showError(error.message);
    }
  };

  return (
    <SideMenuWrapper>
      <MenuItem as="div" onClick={clearCurrentChat}>
        <img
          className="page-logo"
          src={Logo}
          alt="we connect logo"
          loading="lazy"
        />
        <MenuContent>
          <p>WeConnect</p>
        </MenuContent>
      </MenuItem>
      <MenuItemsWrapper>
        {tabItems.map((eachTab) => (
          <MenuItem
            className={`${
              tabActions.currentTab === eachTab.tabName && "active"
            }`}
            onClick={eachTab.action}
            key={eachTab.tabName}
            $circle={eachTab.tabIcon === null}
          >
            <MenuIcons>
              {eachTab.tabIcon ? (
                <eachTab.tabIcon />
              ) : (
                <ImageSmall src={eachTab.profileUrl} alt={eachTab.tabName} />
              )}
            </MenuIcons>

            <MenuContent>
              <p>{eachTab.tabName}</p>
            </MenuContent>
          </MenuItem>
        ))}
        <ModalSmall
          trigger={
            <MenuItem>
              <MenuIcons>
                <Logout />
              </MenuIcons>
              <MenuContent>
                <p>Logout</p>
              </MenuContent>
            </MenuItem>
          }
          content={{
            title: "Are you sure you want to log out?",
            buttonText: "Logout",
          }}
          action={logout}
        />
      </MenuItemsWrapper>
    </SideMenuWrapper>
  );
}

export default memo(SideMenu);
