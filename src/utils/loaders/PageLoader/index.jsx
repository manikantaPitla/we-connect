import React from "react";
import {
  ChatBoxSkeleton,
  ChatBoxWrapper,
  ChatItem,
  ChatListContainer,
  ComponentWrapper,
  DevContact,
  MainLoaderWrapper,
  SearchWrapper,
  SideBarSkeleton,
  SideMenuSkeleton,
  SideMenuSkeletonItems,
  UserListWrapper,
} from "./style";
import Skeleton from "react-loading-skeleton";
import { useWidth } from "../../../hooks";

function PageLoader() {
  const width = useWidth();

  return (
    <MainLoaderWrapper>
      <ComponentWrapper>
        <SideMenuSkeleton>
          <Skeleton className="page-logo" height={50} width={50} circle />
          <SideMenuSkeletonItems>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </SideMenuSkeletonItems>
        </SideMenuSkeleton>
      </ComponentWrapper>
      <SideBarSkeleton>
        <SearchWrapper>
          <Skeleton />
          <Skeleton />
          <hr />
        </SearchWrapper>
        <UserListWrapper>
          <ChatListContainer>
            {Array.from({ length: 5 }).map((_, index) => (
              <ChatItem key={index}>
                <div className="chat-list-image-container">
                  <Skeleton circle height={50} width={50} />
                </div>
                <div className="chat-list-user-content">
                  <Skeleton />
                  <Skeleton />
                </div>
                <Skeleton width={50} />
              </ChatItem>
            ))}
          </ChatListContainer>
        </UserListWrapper>
      </SideBarSkeleton>
      {width > 800 && (
        <ChatBoxWrapper>
          <ChatBoxSkeleton>
            <div></div>
            <div className="mid-container">
              <Skeleton height={150} width={150} circle />
              <Skeleton width={150} />
              <Skeleton width={300} />
            </div>
            <DevContact>
              <Skeleton width={200} height={8} />
              <div>
                <Skeleton height={15} width={15} />
                <Skeleton height={15} width={15} />
              </div>
            </DevContact>
          </ChatBoxSkeleton>
        </ChatBoxWrapper>
      )}
    </MainLoaderWrapper>
  );
}

export default PageLoader;
