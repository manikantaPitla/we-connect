import React, { memo } from "react";
import { ProfileWrapper } from "./style";
import { useSelector } from "react-redux";
import { PopUpModalLarge } from "../PopUp";
import UpdateProfile from "../UpdateProfile";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import defaultProfileImage from "../../assets/images/default-user.webp";

function Profile() {
  const user = useSelector((state) => state.auth.user);
  console.log("Profile initialized");

  return (
    <PopUpModalLarge
      trigger={
        <ProfileWrapper>
          {user ? (
            <>
              <img
                src={user.thumbnailUrl || defaultProfileImage}
                alt={user.displayName || "default profile"}
                loading="lazy"
              />
              <div>
                <h1>{user.displayName}</h1>
                <p>{user.email}</p>
              </div>
            </>
          ) : (
            <>
              <Skeleton circle height={50} width={50} />
              <div>
                <Skeleton />
                <Skeleton />
              </div>
            </>
          )}
        </ProfileWrapper>
      }
    >
      {(close) => <UpdateProfile closeModal={close} />}
    </PopUpModalLarge>
  );
}

export default memo(Profile);
