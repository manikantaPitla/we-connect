import React, { useEffect, useState } from "react";
import { HomeContainer, FlexColumn } from "./styles.";
import {
  ChatBox,
  Profile,
  SideBar,
  SideMenu,
  UpdateProfile,
} from "../../components";
import { PopUpModalLarge } from "../../components";
import { useSelector } from "react-redux";
import { authUserProtection } from "../../services";
import { useAuthActions } from "../../hooks";
import { useNavigate } from "react-router-dom";

function Home() {
  const [isModalVisible, setModalVisible] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const { setUser } = useAuthActions();
  const navigate = useNavigate();

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
          <SideMenu />
          <FlexColumn>
            <SideBar />
            <Profile />
          </FlexColumn>
          <ChatBox />
        </>
      )}
    </HomeContainer>
  );
}

export default Home;
