import React, { useState } from "react";
import { InputEl, StyledLargeModal, ButtonM } from "../../styles/commonStyles";
import { UserAdd, CiSearch } from "../../assets/icons";
import {
  Header,
  LoadingWrapper,
  ResponseMsg,
  SearchContainer,
  SearchLogo,
  SearchUsersList,
  SkeletonWrapper,
  UserListItem,
} from "./style";
import searchUserImage from "../../assets/svg/search-img.svg";
import { useLoading } from "../../hooks";
import {
  searchUser,
  sendConnectionRequest,
  showError,
  showSuccess,
} from "../../services";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

import { DotLoader } from "../Loader";
import defaultProfileImage from "../../assets/images/default-user.webp";

function AddNewChat({ closeModal }) {
  console.log("AddNewChat ");
  const [searchValue, setSearchValue] = useState("");
  const [response, setResponse] = useState("");
  const [usersList, setUsersList] = useState([]);

  const { loading, startLoading, stopLoading } = useLoading();
  const [connectionSentUser, setConnectionSentUser] = useState(null);

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

  const handleUserClick = async (recieverUserId) => {
    setConnectionSentUser(recieverUserId);
    console.log("request sending started");

    try {
      await sendConnectionRequest(currentUser.uid, recieverUserId);
      console.log("request sending successful");
      showSuccess("Request sent successfully");
    } catch (error) {
      showError(error.message);
      console.log("request sending error");
    } finally {
      setConnectionSentUser(null);
    }
  };

  return (
    <StyledLargeModal>
      <Header>
        <div>
          <UserAdd size={19} />
          <p>Add user</p>
        </div>
        <ButtonM onClick={closeModal}>Close</ButtonM>
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
              {usersList.map((eachUser) => (
                <UserListItem key={eachUser.uid}>
                  <img
                    src={eachUser.thumbnail || defaultProfileImage}
                    alt={eachUser.displayName || "default profile"}
                    loading="lazy"
                  />
                  <div>
                    <h1>{eachUser.displayName}</h1>
                    <p>{eachUser.email}</p>
                  </div>
                  <ButtonM onClick={() => handleUserClick(eachUser.uid)}>
                    {connectionSentUser !== null &&
                    connectionSentUser === eachUser.uid ? (
                      <DotLoader />
                    ) : (
                      "Request"
                    )}
                  </ButtonM>
                </UserListItem>
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
