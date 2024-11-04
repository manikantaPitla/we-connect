import React, { useState } from "react";
import { InputEl, StyledLargeModal } from "../../styles/commonStyles";
import { UserAdd, CiSearch } from "../../assets/icons";
import {
  Header,
  LoadingWrapper,
  ResponseMsg,
  SearchContainer,
  SearchLogo,
  SearchUsersList,
  SkeletonWrapper,
} from "./style";
import searchUserImage from "../../assets/svg/search-img.svg";
import { useLoading } from "../../hooks";
import { searchUser, showError } from "../../services";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

function AddNewChat({ closeModal }) {
  const [searchValue, setSearchValue] = useState("");
  const [response, setResponse] = useState("");
  const [usersList, setUsersList] = useState([]);

  const [loading, startLoading, stopLoading] = useLoading();
  const currentUser = useSelector((state) => state.auth.user);

  const handleUserSearch = async (e) => {
    e.preventDefault();

    setUsersList([]);
    if (!searchValue) return;
    startLoading();
    setResponse("");

    try {
      const data = await searchUser(searchValue, currentUser.uid);
      if (data.length === 0) {
        setResponse(" No results found");
        return;
      }
      console.log(data);
      setUsersList(data);
    } catch (error) {
      showError(error.message);
    } finally {
      stopLoading();
    }
  };

  return (
    <StyledLargeModal>
      <Header>
        <div>
          <UserAdd size={19} />
          <p>Add user</p>
        </div>
        <button onClick={closeModal}>Close</button>
      </Header>
      <SearchContainer onSubmit={handleUserSearch}>
        <InputEl>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type="submit">
            <CiSearch />
          </button>
        </InputEl>
      </SearchContainer>

      {loading ? (
        <LoadingWrapper>
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonWrapper key={index}>
              <Skeleton circle width={50} height={50} />
              <div>
                <Skeleton width={100} />
                <Skeleton width={150} />
              </div>
            </SkeletonWrapper>
          ))}
        </LoadingWrapper>
      ) : (
        <>
          {usersList.length > 0 ? (
            <SearchUsersList>
              {usersList.map((user) => (
                <li key={user.uid} onClick={() => handleClickUser(user)}>
                  <>
                    <img
                      src={user.thumbnail}
                      alt={user.displayName}
                      loading="lazy"
                    />
                    <div>
                      <h1>{user.displayName}</h1>
                      <p>{user.email}</p>
                    </div>
                  </>
                </li>
              ))}
            </SearchUsersList>
          ) : (
            <div
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {response && <ResponseMsg>{response}</ResponseMsg>}
              <SearchLogo>
                <img src={searchUserImage} alt="Search User" loading="lazy" />
              </SearchLogo>
            </div>
          )}
        </>
      )}
    </StyledLargeModal>
  );
}

export default AddNewChat;
