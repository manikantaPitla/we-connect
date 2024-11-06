import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getReceivedRequests } from "../../services";
import { SkeletonWrapper, UserItem } from "./style";
import { ButtonM } from "../../styles/commonStyles";
import { useLoading } from "../../hooks";
import Skeleton from "react-loading-skeleton";

function ReceivedConnections() {
  const [userList, setUserList] = useState([]);
  const user = useSelector((state) => state.auth.user);

  const { loading, stopLoading } = useLoading(true);

  const fetchReceivedRequests = async () => {
    try {
      const userList = await getReceivedRequests(user.uid);
      setUserList(userList);
    } catch (err) {
      console.log(err);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchReceivedRequests();
  }, []);

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
          {userList.map((user, index) => (
            <UserItem key={index}>
              <img src={user.photoUrl} alt={user.displayName} loading="lazy" />
              <p>{user.displayName}</p>
              <div>
                <ButtonM>Accept</ButtonM>
                <ButtonM $outline>Decline</ButtonM>
              </div>
            </UserItem>
          ))}
        </>
      )}
    </>
  );
}

export default ReceivedConnections;
