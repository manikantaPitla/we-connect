import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  acceptConnectionRequest,
  getUserConnectionRequests,
  declineConnectionRequest,
  showError,
  showSuccess,
} from "../../services";
import { NoRequestsWrapper, SkeletonWrapper, UserItem } from "./style";
import { ButtonM, ImageSmall } from "../../styles/commonStyles";
import { useLoading } from "../../hooks";
import Skeleton from "react-loading-skeleton";

import defaultProfileImage from "../../assets/images/default-user.webp";
import { DotLoader } from "../Loader";

function ReceivedConnections() {
  const [receivedRequestsList, setReceivedRequestsList] = useState([]);
  const user = useSelector((state) => state.auth.user);

  const {
    loading,
    stopLoading,
    loadingId: declineLoadingId,
    setLoadingId: setDeclineLoadingId,
  } = useLoading(true);
  const { loadingId: acceptLoadingId, setLoadingId: setAcceptLoadingId } =
    useLoading();

  const fetchReceivedRequests = async () => {
    try {
      const userList = await getUserConnectionRequests(user.uid, false);
      setReceivedRequestsList(userList);
    } catch (err) {
      console.log(err);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchReceivedRequests();
  }, []);

  const handleAcceptRequest = async (requestedUserId) => {
    if (declineLoadingId) return;

    setAcceptLoadingId(requestedUserId);
    try {
      await acceptConnectionRequest(requestedUserId, user.uid);
      setReceivedRequestsList(
        receivedRequestsList.filter(
          (recievedRequest) => recievedRequest.uid !== requestedUserId
        )
      );
    } catch (error) {
      console.log(error);
      showError("Error while accepting request");
    } finally {
      setAcceptLoadingId(null);
    }
  };

  const handleRemoveRequest = async (receivedUserId) => {
    if (acceptLoadingId) return;

    setDeclineLoadingId(receivedUserId);
    try {
      await declineConnectionRequest(user.uid, receivedUserId);

      setReceivedRequestsList(
        receivedRequestsList.filter(
          (recievedRequest) => recievedRequest.uid !== receivedUserId
        )
      );
      showSuccess("Sent request removed successfully");
    } catch (error) {
      console.log(error);
      showError("Error while removing request");
    } finally {
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
              <Skeleton height={30} width={60} />
            </SkeletonWrapper>
          ))}
        </>
      ) : (
        <>
          {receivedRequestsList.length > 0 ? (
            <>
              {receivedRequestsList.map((user, index) => (
                <UserItem key={index}>
                  <ImageSmall
                    src={user.thumbnailUrl || defaultProfileImage}
                    alt={user.displayName || "default profile"}
                    loading="lazy"
                  />
                  <p>{user.displayName}</p>
                  <div>
                    <ButtonM
                      disabled={acceptLoadingId === user.uid}
                      type="button"
                      onClick={() => handleAcceptRequest(user.uid)}
                    >
                      {acceptLoadingId === user.uid ? (
                        <DotLoader sizeSmall={true} />
                      ) : (
                        "Accept"
                      )}
                    </ButtonM>
                    <ButtonM
                      disabled={declineLoadingId === user.uid}
                      $outline
                      onClick={() => handleRemoveRequest(user.uid)}
                    >
                      {declineLoadingId === user.uid ? (
                        <DotLoader changeColor={true} sizeSmall={true} />
                      ) : (
                        "Decline"
                      )}
                    </ButtonM>
                  </div>
                </UserItem>
              ))}
            </>
          ) : (
            <NoRequestsWrapper>
              <p>No requests received</p>
            </NoRequestsWrapper>
          )}
        </>
      )}
    </>
  );
}

export default ReceivedConnections;
