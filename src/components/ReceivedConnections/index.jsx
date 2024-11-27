import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  acceptConnectionRequest,
  getUserConnectionRequests,
  declineConnectionRequest,
  showError,
  showSuccess,
} from "../../services";
import { NoRequestsWrapper, UserItem } from "./style";
import { ButtonM, ImageSmall } from "../../styles/commonStyles";
import { useLoading } from "../../hooks";

import {
  defaultProfileImage,
  DotLoader,
  ReceivedConnectionsSkeleton,
} from "../../utils";

function ReceivedConnections() {
  const [receivedRequestsList, setReceivedRequestsList] = useState([]);
  const user = useSelector((state) => state.auth.user);

  const { loadingId: declineLoadingId, setLoadingId: setDeclineLoadingId } =
    useLoading();

  const { loading, stopLoading } = useLoading(true);

  const { loadingId: acceptLoadingId, setLoadingId: setAcceptLoadingId } =
    useLoading();

  useEffect(() => {
    let unsubscribe;
    const fetchReceivedRequests = async () => {
      try {
        unsubscribe = await getUserConnectionRequests(
          user.userId,
          "received",
          setReceivedRequestsList
        );
      } catch (error) {
        console.error("failed to get received requests: ", error);
      } finally {
        stopLoading();
      }
    };

    fetchReceivedRequests();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user.userId]);

  const handleAcceptRequest = async (requestedUserId) => {
    if (declineLoadingId) return;

    setAcceptLoadingId(requestedUserId);
    try {
      await acceptConnectionRequest(requestedUserId, user.userId);
      setReceivedRequestsList((prevState) =>
        prevState.filter(
          (recievedRequest) => recievedRequest.userId !== requestedUserId
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
      await declineConnectionRequest(user.userId, receivedUserId);
      setReceivedRequestsList((prevState) =>
        prevState.filter(
          (recievedRequest) => recievedRequest.userId !== receivedUserId
        )
      );
      showSuccess("Sent request removed successfully");
    } catch (error) {
      console.log(error);
      showError("Failed to remove request");
    } finally {
      setDeclineLoadingId(null);
    }
  };
  return (
    <>
      {loading ? (
        <ReceivedConnectionsSkeleton />
      ) : (
        <>
          {receivedRequestsList.length > 0 ? (
            <>
              {receivedRequestsList.map((user) => {
                const { userId, userName, thumbnailURL } = user;

                return (
                  <UserItem key={userId}>
                    <ImageSmall
                      src={thumbnailURL || defaultProfileImage}
                      alt={userName || "default profile"}
                      loading="lazy"
                    />
                    <p>{userName}</p>
                    <div>
                      <ButtonM
                        disabled={acceptLoadingId === userId}
                        type="button"
                        onClick={() => handleAcceptRequest(userId)}
                      >
                        {acceptLoadingId === userId ? (
                          <DotLoader sizeSmall={true} />
                        ) : (
                          "Accept"
                        )}
                      </ButtonM>
                      <ButtonM
                        disabled={declineLoadingId === userId}
                        $outline
                        onClick={() => handleRemoveRequest(userId)}
                      >
                        {declineLoadingId === userId ? (
                          <DotLoader changeColor={true} sizeSmall={true} />
                        ) : (
                          "Decline"
                        )}
                      </ButtonM>
                    </div>
                  </UserItem>
                );
              })}
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
