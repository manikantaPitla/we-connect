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
import { HeaderWrapper } from "../../../components/ChatHeader/style";
import { ChatBodyWrapper } from "../../../components/ChatBody/style";

import { ChatInputWrapper } from "../../../components/ChatInput/style";
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

// CHAT LOADING SKELETON STYLES****************************************************************

export const ChatSkeleton = styled(ChatBoxWrapper)``;
export const ChatHeaderSkeleton = styled(HeaderWrapper)``;
export const ChatBodySkeleton = styled(ChatBodyWrapper)``;
export const ChatInputSkeleton = styled(ChatInputWrapper)`
  display: flex;
  .input-skeleton {
    flex: 1;
  }

  .button-skeleton {
    span {
      height: 40px;
      width: 40px;
      border-radius: var(--primary-border-radius);
    }
  }
`;

export const PageLoaderWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;
