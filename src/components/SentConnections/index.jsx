import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  declineConnectionRequest,
  getUserConnectionRequests,
  showError,
  showSuccess,
} from "../../services";
import { NoRequestsWrapper, SkeletonWrapper, UserItem } from "./style";
import { ButtonM } from "../../styles/commonStyles";
import { useLoading } from "../../hooks";
import Skeleton from "react-loading-skeleton";
import { DotLoader } from "../Loader";

import defaultProfileImage from "../../assets/images/default-user.webp";

function sentConnections() {
  const [sentRequestsList, setSentRequestsList] = useState([]);

  const user = useSelector((state) => state.auth.user);
  const { loading, stopLoading, loadingId, setLoadingId } = useLoading(true);

  const fetchSentRequests = async () => {
    try {
      const userList = await getUserConnectionRequests(user.uid);
      setSentRequestsList(userList);
    } catch (err) {
      console.log(err);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchSentRequests();
  }, []);

  const handleRemoveRequest = async (receivedUserId) => {
    setLoadingId(receivedUserId);
    try {
      await declineConnectionRequest(user.uid, receivedUserId, true);

      setSentRequestsList(
        sentRequestsList.filter(
          (sentRequest) => sentRequest.uid !== receivedUserId
        )
      );
      showSuccess("Sent request removed successfully");
    } catch (error) {
      showError("Error while removing request");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      {loading ? (
        <>
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonWrapper key={index}>
              <Skeleton height={50} width={50} circle />
              <p>
                <Skeleton />
              </p>
              <Skeleton height={30} width={60} />
            </SkeletonWrapper>
          ))}
        </>
      ) : (
        <>
          {sentRequestsList.length > 0 ? (
            <>
              {sentRequestsList.map((user, index) => (
                <UserItem key={index}>
                  <img
                    src={user.thumbnailUrl || defaultProfileImage}
                    alt={user.displayName || "default profile"}
                    loading="lazy"
                  />
                  <p>{user.displayName}</p>
                  <div>
                    <ButtonM
                      $outline
                      type="button"
                      onClick={() => handleRemoveRequest(user.uid)}
                      disabled={loadingId === user.uid}
                    >
                      {loadingId === user.uid ? (
                        <DotLoader changeColor={true} sizeSmall={true} />
                      ) : (
                        "Remove"
                      )}
                    </ButtonM>
                  </div>
                </UserItem>
              ))}
            </>
          ) : (
            <NoRequestsWrapper>
              <p>No requests sent</p>
            </NoRequestsWrapper>
          )}
        </>
      )}
    </>
  );
}

export default sentConnections;
