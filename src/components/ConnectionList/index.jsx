import React, { useState, useEffect } from "react";
import {
  ConnectionContainer,
  TabWrapper,
  UserItem,
  UserItemsContainer,
} from "./style";
import { getSentRequests, getReceivedRequests } from "../../services";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { ButtonM } from "../../styles/commonStyles";
import { useLoading } from "../../hooks";

const tabItems = [{ name: "Received" }, { name: "Sent" }];

function ConnectionList() {
  const [activeTab, setActiveTab] = useState(tabItems[0].name);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);

  const user = useSelector((state) => state.auth.user);
  const [loading, startLoading, stopLoading] = useLoading(true);

  useEffect(() => {
    if (activeTab === "Received") {
      fetchReceivedRequests();
    } else if (activeTab === "Sent") {
      fetchSentRequests();
    }
  }, [activeTab, user]);

  const fetchReceivedRequests = async () => {
    if (!user) return;
    try {
      const requests = await getReceivedRequests(user.uid);
      setReceivedRequests(requests);
      console.log(requests);
    } catch (error) {
      console.error("Failed to fetch received requests:", error);
    } finally {
      stopLoading();
    }
  };

  const fetchSentRequests = async () => {
    if (!user) return;
    try {
      const requests = await getSentRequests(user.uid);
      setSentRequests(requests);
    } catch (error) {
      console.error("Failed to fetch sent requests:", error);
    } finally {
      stopLoading();
    }
  };

  const renderTabData = () => {
    if (activeTab === "Received") {
      return receivedRequests.map((request, index) => (
        <UserItem key={index}>
          <img width={50} src={request.photoUrl} />
          <p>{request.displayName}</p>
          <div>
            <ButtonM>Accept</ButtonM>
            <ButtonM $outline>Decline</ButtonM>
          </div>
        </UserItem>
      ));
    } else if (activeTab === "Sent") {
      return sentRequests.map((request, index) => (
        <UserItem key={index}>
          <img width={50} src={request.photoUrl} />
          <p>{request.displayName}</p>
          <div>
            {/* <ButtonSm>Accept</ButtonSm> */}
            <ButtonM $outline>Cancel</ButtonM>
          </div>
        </UserItem>
      ));
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

          <UserItemsContainer>
            {loading ? "Loading " : renderTabData()}
          </UserItemsContainer>
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
