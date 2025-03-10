import React from "react";
import {
  ChatBodySkeleton,
  ChatBoxSkeleton,
  ChatBoxWrapper,
  ChatHeaderSkeleton,
  ChatInputSkeleton,
  ChatItem,
  ChatListContainer,
  ChatSkeleton,
  ComponentWrapper,
  DevContact,
  MainLoaderWrapper,
  PageLoaderWrapper,
  SearchWrapper,
  SideBarSkeleton,
  SideMenuSkeleton,
  SideMenuSkeletonItems,
  UserListWrapper,
} from "./style";
import Skeleton from "react-loading-skeleton";
import { useWidth } from "../../../hooks";

import { squircle } from "ldrs";
squircle.register();

function PageLoader({ chatLoader }) {
  const width = useWidth();

  return (
    <>
      {chatLoader ? (
        <ChatSkeleton>
          <ChatHeaderSkeleton>
            <div className="user-chat-profile">
              <Skeleton height={50} width={50} circle />
              <h5>
                <Skeleton width={60} />
              </h5>
            </div>
            <Skeleton width={8} height={30} />
          </ChatHeaderSkeleton>
          <ChatBodySkeleton></ChatBodySkeleton>
          <ChatInputSkeleton>
            <div className="input-skeleton"></div>
            <div className="button-skeleton">
              <Skeleton />
            </div>
            <div className="button-skeleton">
              <Skeleton />
            </div>
          </ChatInputSkeleton>
        </ChatSkeleton>
      ) : (
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
      )}
    </>
  );
}

export const MainPageLoader = () => (
  <PageLoaderWrapper>
    <l-squircle
      size="37"
      stroke="5"
      stroke-length="0.15"
      bg-opacity="0.1"
      speed="0.9"
      color="var(--primary-color)"
    ></l-squircle>
  </PageLoaderWrapper>
);

export default PageLoader;
