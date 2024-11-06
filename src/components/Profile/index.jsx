import React, { memo } from "react";
import { ProfileWrapper } from "./style";
import { useSelector } from "react-redux";
import { PopUpModalLarge } from "../PopUp";
import UpdateProfile from "../UpdateProfile";
import NoImage from "../../assets/images/no-image.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Profile() {
  const user = useSelector((state) => state.auth.user);
  console.log("Profile initialized");

  const handleImageError = (e) => {
    console.log(e);
    e.target.src = NoImage;
    e.target.alt = "No Image";
  };

  return (
    <PopUpModalLarge
      trigger={
        <ProfileWrapper>
          {user ? (
            <>
              <img
                src={user.thumbnail}
                alt={user.displayName}
                onError={handleImageError}
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
