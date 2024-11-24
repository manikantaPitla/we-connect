import styled from "styled-components";
import { HomeContainer, ComponentWrapper } from "../../../pages/Home/styles.";
import {
  SideMenuWrapper,
  MenuItemsWrapper,
} from "../../../components/SideMenu/style";

import { SideBarWrapper } from "../../../components/SideBar/style";
import {
  ChatBoxWrapper,
  DefaultUserContainer,
} from "../../../components/ChatBox/style";
import {
  SearchWrapper,
  UserListWrapper,
} from "../../../components/SideBar/style";
import {
  ChatListContainer,
  ChatItem,
} from "../../../components/ChatList/style";

import { DevContact } from "../../../components/ChatBox/style";

export {
  ComponentWrapper,
  ChatBoxWrapper,
  SearchWrapper,
  UserListWrapper,
  ChatListContainer,
  ChatItem,
  DevContact,
};

export const MainLoaderWrapper = styled(HomeContainer)``;

// SIDEBAR SKELETON STYLES****************************************************************

export const SideMenuSkeleton = styled(SideMenuWrapper)``;

export const SideMenuSkeletonItems = styled(MenuItemsWrapper)`
  span {
    height: 50px;
    width: 50px;
    border-radius: var(--primary-border-radius);

    @media screen and (max-width: 800px) {
      width: 100%;
    }

    @media screen and (max-width: 600px) {
      width: 50px;
    }
  }
`;

// SIDEMENU SKELETON STYLES****************************************************************

export const SideBarSkeleton = styled(SideBarWrapper)``;

// CHATBOX SKELETON STYLES****************************************************************
export const ChatBoxSkeleton = styled(DefaultUserContainer)``;
