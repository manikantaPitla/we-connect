import React, { memo, useState } from "react";
import { SearchWrapper, SideBarWrapper, UserListWrapper } from "./style";
import { CiSearch } from "../../assets/icons";
import { ButtonXl, InputEl } from "../../styles/commonStyles";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { ChatList, ConnectionList, AddNewChat, Profile } from "..";

import { ModalLarge } from "../../utils";

function SideBar({ tab }) {
  console.log("Side Bar");

  const [searchVal, setSearchVal] = useState("");

  const renderChatList = () => (
    <>
      <SearchWrapper>
        <InputEl $nospace>
          <CiSearch />
          <input
            type="text"
            placeholder="Search"
            name="search"
            onChange={(e) => setSearchVal(e.target.value)}
          />
        </InputEl>
        <ModalLarge
          trigger={
            <ButtonXl className="button-content">Start New Chat</ButtonXl>
          }
        >
          {(close) => <AddNewChat closeModal={close} />}
        </ModalLarge>
        <hr />
      </SearchWrapper>
      <UserListWrapper>{<ChatList searchVal={searchVal} />}</UserListWrapper>
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
