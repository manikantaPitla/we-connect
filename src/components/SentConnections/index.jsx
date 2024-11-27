import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  declineConnectionRequest,
  getUserConnectionRequests,
  showError,
  showSuccess,
} from "../../services";
import { NoRequestsWrapper, UserItem } from "./style";
import { ButtonM, ImageSmall } from "../../styles/commonStyles";
import { useLoading } from "../../hooks";
import {
  defaultProfileImage,
  DotLoader,
  SentConnectionsSkeleton,
} from "../../utils";

function sentConnections() {
  const [sentRequestsList, setSentRequestsList] = useState([]);

  const user = useSelector((state) => state.auth.user);
  const { loading, stopLoading, loadingId, setLoadingId } = useLoading(true);

  useEffect(() => {
    let unsubscribe;

    const fetchSentRequests = async () => {
      try {
        unsubscribe = await getUserConnectionRequests(
          user.userId,
          "sent",
          setSentRequestsList
        );
      } catch (error) {
        console.error("failed to get sent requests: ", error);
      } finally {
        stopLoading();
      }
    };

    fetchSentRequests();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user.userId]);
  const handleRemoveRequest = async (receivedUserId) => {
    setLoadingId(receivedUserId);
    try {
      await declineConnectionRequest(user.userId, receivedUserId, true);

      setSentRequestsList(
        sentRequestsList.filter(
          (sentRequest) => sentRequest.userId !== receivedUserId
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
        <SentConnectionsSkeleton />
      ) : (
        <>
          {sentRequestsList.length > 0 ? (
            <>
              {sentRequestsList.map((user) => {
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
                        $outline
                        type="button"
                        onClick={() => handleRemoveRequest(userId)}
                        disabled={loadingId === userId}
                      >
                        {loadingId === userId ? (
                          <DotLoader changeColor={true} sizeSmall={true} />
                        ) : (
                          "Remove"
                        )}
                      </ButtonM>
                    </div>
                  </UserItem>
                );
              })}
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
