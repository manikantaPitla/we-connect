import React, { useEffect, useState } from "react";
import { HomeContainer, FlexColumn } from "./styles.";
import {
  ChatBody,
  Profile,
  SideBar,
  SideMenu,
  UpdateProfile,
} from "../../components";
import { PopUpModalLarge } from "../../components";
import { useSelector } from "react-redux";

function Home() {
  const [isModalVisible, setModalVisible] = useState(false);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    setModalVisible(false);

    if (user && user.photoURL === null) {
      setModalVisible(true);
    }
  }, [user]);

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
          <ChatBody />
        </>
      )}
    </HomeContainer>
  );
}

export default Home;
