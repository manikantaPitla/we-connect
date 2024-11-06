import React, { useState } from "react";
import { ConnectionContainer, TabWrapper, UserItemsContainer } from "./style";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import ReceivedConnections from "../ReceivedConnections";
import SentConnections from "../SentConnections";

const tabItems = [{ name: "Received" }, { name: "Sent" }];

function ConnectionList() {
  const [activeTab, setActiveTab] = useState(tabItems[0].name);

  const user = useSelector((state) => state.auth.user);

  const renderTabData = () => {
    if (activeTab === "Received") {
      return <ReceivedConnections />;
    } else if (activeTab === "Sent") {
      return <SentConnections />;
    }
  };

  return (
    <ConnectionContainer>
      {user ? (
        <>
          <h4>Connection Requests</h4>

          <TabWrapper>
            {tabItems.map((tabItem) => (
              <button
                type="button"
                className={`${activeTab === tabItem.name && "active-tab"}`}
                key={tabItem.name}
                onClick={() => setActiveTab(tabItem.name)}
              >
                {tabItem.name}
              </button>
            ))}
          </TabWrapper>

          <UserItemsContainer>{renderTabData()}</UserItemsContainer>
        </>
      ) : (
        <>
          <Skeleton width={150} />
          <TabWrapper>
            <Skeleton />
            <Skeleton />
          </TabWrapper>
        </>
      )}
    </ConnectionContainer>
  );
}

export default ConnectionList;
