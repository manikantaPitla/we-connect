import React, { memo } from "react";
import { SearchWrapper, SideBarWrapper, UserListWrapper } from "./style";
import { CiSearch } from "../../assets/icons";
import { ButtonXl, InputEl } from "../../styles/commonStyles";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { ChatList, ConnectionList, AddNewChat, Profile } from "..";

import { ModalLarge } from "../../utils";

function SideBar({ tab }) {
  console.log("Side Bar");
  const user = useSelector((state) => state.auth.user);

  const renderChatList = () => (
    <>
      <SearchWrapper>
        {user ? (
          <>
            <InputEl $nospace>
              <CiSearch />
              <input type="search" placeholder="Search" name="search" />
            </InputEl>
            <ModalLarge
              trigger={
                <ButtonXl className="button-content">Start New Chat</ButtonXl>
              }
            >
              {(close) => <AddNewChat closeModal={close} />}
            </ModalLarge>
          </>
        ) : (
          <>
            <Skeleton />
            <Skeleton />
          </>
        )}
        <hr />
      </SearchWrapper>
      <UserListWrapper>{<ChatList />}</UserListWrapper>
    </>
  );

  const renderComponents = () => {
    switch (tab) {
      case "Chats":
        return renderChatList();
      case "Connections":
        return <ConnectionList />;
      case "Profile":
        return <Profile />;
      default:
        return renderChatList();
    }
  };

  return <SideBarWrapper>{renderComponents()}</SideBarWrapper>;
}

export default memo(SideBar);
