import React, { useMemo, useState } from "react";
import { HomeContainer, ComponentWrapper } from "./styles.";
import { ChatBox, SideBar, SideMenu } from "../../components";
import { useWidth } from "../../hooks";

function Home() {
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
