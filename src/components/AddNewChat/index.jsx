import React, { useState } from "react";
import {
  InputEl,
  StyledLargeModal,
  ButtonM,
  ImageSmall,
} from "../../styles/commonStyles";
import { UserAdd, CiSearch } from "../../assets/icons";
import {
  Header,
  ResponseMsg,
  SearchContainer,
  SearchLogo,
  SearchUsersList,
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

import { defaultErrorImage, DotLoader, SearchUserLoader } from "../../utils";
import { defaultProfileImage } from "../../utils";

function AddNewChat({ closeModal }) {
  console.log("AddNewChat ");
  const [searchValue, setSearchValue] = useState("");
  const [response, setResponse] = useState("");
  const [usersList, setUsersList] = useState([]);

  const {
    loading,
    stopLoading,
    startLoading,
    loadingId: requestLoadingId,
    setLoadingId: sendRequestLoadingId,
  } = useLoading();

  const currentUser = useSelector((state) => state.auth.user);

  const handleUserSearch = async (e) => {
    e.preventDefault();

    setUsersList([]);
    if (!searchValue) return;
    startLoading();
    setResponse("");

    try {
      const data = await searchUser(searchValue, currentUser?.userId);

      console.log("searchList :", data);
      if (data.length === 0) {
        setResponse("No users found");
        return;
      }
      setUsersList(data);
    } catch (error) {
      console.error("Failed to search for users: ", error);
      showError(error.message);
    } finally {
      stopLoading();
    }
  };

  const handleUserClick = async (recieverUserId) => {
    sendRequestLoadingId(recieverUserId);

    try {
      await sendConnectionRequest(currentUser.userId, recieverUserId);
      showSuccess("Request sent successfully");
    } catch (error) {
      showError(error.message);
      log.error("Failed to send request: ", error);
    } finally {
      sendRequestLoadingId(null);
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
        <SearchUserLoader />
      ) : (
        <>
          {usersList.length > 0 ? (
            <SearchUsersList>
              {usersList.map((user) => {
                const {
                  userId,
                  thumbnailURL,
                  userName,
                  email,
                  isConnectionPending,
                  alreadyConnected,
                } = user;
                return (
                  <UserListItem key={userId}>
                    <ImageSmall
                      src={thumbnailURL || defaultProfileImage}
                      alt={userName}
                      loading="lazy"
                      onError={(e) => (e.target.src = defaultErrorImage)}
                    />
                    <div>
                      <h1>{userName}</h1>
                      <p>{email}</p>
                    </div>
                    {isConnectionPending ? (
                      <ButtonM type="button">Pending</ButtonM>
                    ) : (
                      <>
                        {alreadyConnected ? (
                          <ButtonM type="button">Chat</ButtonM>
                        ) : (
                          <ButtonM
                            type="button"
                            onClick={() => handleUserClick(userId)}
                            disabled={requestLoadingId === userId}
                          >
                            {requestLoadingId === userId ? (
                              <DotLoader sizeSmall={true} />
                            ) : (
                              "Request"
                            )}
                          </ButtonM>
                        )}
                      </>
                    )}
                  </UserListItem>
                );
              })}
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
