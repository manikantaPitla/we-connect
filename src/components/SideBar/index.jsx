import React from "react";
import { SearchWrapper, SideBarWrapper, UserListWrapper } from "./style";
import { CiSearch } from "../../assets/icons";
import { ButtonEl, InputEl } from "../../styles/commonStyles";
import { PopUpModalLarge } from "../PopUp";
import AddNewChat from "../AddNewChat";

function SideBar() {
  console.log("Side Bar");

  return (
    <SideBarWrapper>
      <SearchWrapper>
        <InputEl>
          <CiSearch />
          <input type="search" placeholder="Search" />
        </InputEl>
        <PopUpModalLarge trigger={<ButtonEl>Start New Chat</ButtonEl>}>
          {(close) => <AddNewChat closeModal={close} />}
        </PopUpModalLarge>
        <hr />
      </SearchWrapper>
      <UserListWrapper></UserListWrapper>
    </SideBarWrapper>
  );
}

export default SideBar;
