import React, { useCallback, useEffect, useState } from "react";
import { HomeContainer, FlexColumn } from "./styles.";
import {
  ChatBox,
  Profile,
  SideBar,
  SideMenu,
  UpdateProfile,
} from "../../components";
import { PopUpModalLarge } from "../../components";
import { authUserProtection, changeTab } from "../../services";
import { useAuthActions } from "../../hooks";
import { useNavigate } from "react-router-dom";

function Home() {
  const [isModalVisible, setModalVisible] = useState(false);
  const { setUser } = useAuthActions();
  const navigate = useNavigate();

  const activeTab =
    JSON.parse(localStorage.getItem("weConnect"))?.activeTab || "Chats";
  const [currentTab, setCurrentTab] = useState(activeTab);

  const onChangeCurrentTab = useCallback((tab) => {
    setCurrentTab(tab);
    changeTab(tab);
  }, []);

  useEffect(() => {
    setModalVisible(false);
    const fetchUserData = async () => {
      try {
        const userInfo = await authUserProtection();
        if (userInfo) {
          setUser(userInfo);
          if (!userInfo.photoURL) {
            setModalVisible(true);
          }
        } else {
          navigate("auth/signin");
        }
      } catch (error) {
        console.log("user auth error :", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <HomeContainer>
      {isModalVisible ? (
        <PopUpModalLarge
          open={isModalVisible}
          onClose={() => setModalVisible(false)}
          closeOnDocumentClick={false}
        >
          {(close) => <UpdateProfile closeModal={close} />}
        </PopUpModalLarge>
      ) : (
        <>
          <SideMenu tabActions={{ onChangeCurrentTab, currentTab }} />
          <FlexColumn>
            <SideBar tab={currentTab} />
            <Profile />
          </FlexColumn>
          <ChatBox />
        </>
      )}
    </HomeContainer>
  );
}

export default Home;
