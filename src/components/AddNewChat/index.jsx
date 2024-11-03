import React, { useState } from "react";
import { InputEl, StyledLargeModal } from "../../styles/commonStyles";
import { UserAdd, CiSearch } from "../../assets/icons";
import {
  Header,
  ResponseMsg,
  SearchContainer,
  SearchLogo,
  SearchUsersList,
} from "./style";
import searchUserImage from "../../assets/svg/search-img.svg";
import { useLoading } from "../../hooks";
import { searchUser, showError } from "../../services";
import { useSelector } from "react-redux";
import { CircleLoader, DotLoader } from "../Loader";

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
        <CircleLoader />
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
                  {/* {userAddStatus !== null && userAddStatus === user.uid ? (
                <DotLoader />
              ) : (
                <>
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    loading="lazy"
                  />
                  <div>
                    <h1>{user.displayName}</h1>
                    <p>{user.email}</p>
                  </div>
                </>
              )} */}
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
