import React, { useEffect } from "react";
import { ProfileWrapper } from "./style";
import { useSelector } from "react-redux";
import { PopUpModalLarge } from "../PopUp";
import UpdateProfile from "../UpdateProfile";
import NoImage from "../../assets/images/no-image.png";

function Profile() {
  const user = useSelector((state) => state.auth.user);
  console.log("Profile Initialized");

  useEffect(() => {}, [user]);

  const handleImageError = (e) => {
    console.log(e);
    e.target.src = NoImage;
    e.target.alt = "No Image";
  };

  return (
    <PopUpModalLarge
      trigger={
        <ProfileWrapper>
          {user && (
            <>
              <img
                src={user.photoURL}
                alt={user.displayName}
                onError={handleImageError}
                loading="lazy"
              />
              <div>
                <h1>{user.displayName}</h1>
                <p>{user.email}</p>
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

export default Profile;
