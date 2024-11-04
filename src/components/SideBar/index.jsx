import React from "react";
import { SearchWrapper, SideBarWrapper, UserListWrapper } from "./style";
import { CiSearch } from "../../assets/icons";
import { ButtonEl, InputEl } from "../../styles/commonStyles";
import { PopUpModalLarge } from "../PopUp";
import AddNewChat from "../AddNewChat";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { ChatList } from "..";

function SideBar() {
  console.log("Side Bar");
  const user = useSelector((state) => state.auth.user);

  return (
    <SideBarWrapper>
      <SearchWrapper>
        {user ? (
          <>
            <InputEl>
              <CiSearch />
              <input type="search" placeholder="Search" />
            </InputEl>
            <PopUpModalLarge trigger={<ButtonEl>Start New Chat</ButtonEl>}>
              {(close) => <AddNewChat closeModal={close} />}
            </PopUpModalLarge>
          </>
        ) : (
          <>
            <Skeleton />
            <Skeleton />
          </>
        )}
        <hr />
      </SearchWrapper>
      <UserListWrapper>
        <ChatList />
      </UserListWrapper>
    </SideBarWrapper>
  );
}

export default SideBar;
