import React from "react";
import { SearchWrapper, SideBarWrapper, UserListWrapper } from "./style";
import { CiSearch } from "../../assets/icons";
import { ButtonEl, InputEl } from "../../styles/commonStyles";

function SideBar() {
  console.log("Side Bar");

  return (
    <SideBarWrapper>
      <SearchWrapper>
        <InputEl>
          <CiSearch />
          <input type="search" placeholder="Search" />
        </InputEl>
        <ButtonEl>Start New Chat</ButtonEl>
        <hr />
      </SearchWrapper>
      <UserListWrapper></UserListWrapper>
    </SideBarWrapper>
  );
}

export default SideBar;
