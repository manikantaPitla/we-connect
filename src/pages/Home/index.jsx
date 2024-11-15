import React, { useEffect, useMemo, useState } from "react";
import { HomeContainer, ComponentWrapper } from "./styles.";
import { ChatBox, SideBar, SideMenu } from "../../components";
import { authUserProtection } from "../../services";
import { useAuthActions, useWidth } from "../../hooks";
import { useNavigate } from "react-router-dom";

function Home() {
  const { setUser } = useAuthActions();
  const navigate = useNavigate();
  const activeTab = "Chats";
  const [currentTab, setCurrentTab] = useState(activeTab);
  const width = useWidth();

  const onChangeCurrentTab = (tab) => {
    setCurrentTab(tab);
  };

  const tabActions = useMemo(
    () => ({ onChangeCurrentTab, currentTab }),
    [onChangeCurrentTab, currentTab]
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userInfo = await authUserProtection();
        if (userInfo) {
          setUser(userInfo);
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
      <ComponentWrapper>
        <SideMenu tabActions={tabActions} />
      </ComponentWrapper>
      <SideBar tab={currentTab} />
      {width > 800 && <ChatBox />}
    </HomeContainer>
  );
}

export default Home;
