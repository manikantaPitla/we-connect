import React, { useEffect, useState } from "react";
import {
  ButtonFlex,
  FormContainer,
  MainContainer,
  ProfileWrapper,
  SuggestProfileUpdate,
  Title,
} from "./style";
import { useSelector } from "react-redux";
import { ButtonEl, InputEl } from "../../styles/commonStyles";
import defaultImage from "../../assets/images/default-user.webp";
import { Edit, Warning2 } from "../../assets/icons";
import { useLoading, useAuthActions } from "../../hooks";
import {
  showError,
  showSuccess,
  updateUserProfile,
  uploadMedia,
} from "../../services";
import DotLoader from "../Loader";

function UpdateProfile({ closeModal }) {
  const [profileImage, setProfileImage] = useState(defaultImage);
  const [profileFile, setProfileFile] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [imageUploadingStatus, setImageUploadingStatus] = useState("");

  const user = useSelector((state) => state.auth.user);
  const [loading, startLoading, stopLoading] = useLoading();
  const { setUser } = useAuthActions();

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
      user.photoURL && setProfileImage(user.photoURL);
    }
  }, [user]);

  const handleClose = () => {
    setProfileFile(null);
    setDisplayName(null);

    closeModal();
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setProfileFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadProfileImage = async (userId, file) => {
    return await uploadMedia(userId, "profiles", file, (progress) =>
      setImageUploadingStatus(`${progress}%`)
    );
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    if (
      (profileImage === user.photoURL || profileImage === defaultImage) &&
      displayName === user.displayName
    ) {
      showError("Please make some changes to update profile.");
      return;
    }

    try {
      startLoading();

      let profileUploadUrl;

      if (profileImage !== defaultImage && profileImage !== user.photoURL) {
        profileUploadUrl = await uploadProfileImage(user.uid, profileFile);
        setImageUploadingStatus("");
      }

      const dataToUpdate = {};

      if (displayName !== user.displayName)
        dataToUpdate.displayName = displayName;
      if (profileImage !== user.photoURL)
        dataToUpdate.photoURL = profileUploadUrl;

      if (Object.keys(dataToUpdate).length > 0) {
        await updateUserProfile(dataToUpdate, setUser);
      }

      showSuccess("Profile updated successfully.");
      closeModal();
    } catch (error) {
      showError(error.message);
    } finally {
      stopLoading();
    }
  };

  return (
    <MainContainer>
      <Title>{user.photoURL ? "PROFILE" : "UPDATE PROFILE"}</Title>
      {!user?.photoURL && (
        <SuggestProfileUpdate>
          <Warning2 size={18} />
          <p>Complete your profile with a profile pic</p>
        </SuggestProfileUpdate>
      )}
      <FormContainer onSubmit={handleProfileUpdate}>
        <ProfileWrapper>
          <div>
            <img src={profileImage} alt="user image" />
            {imageUploadingStatus && (
              <p>
                <span>{imageUploadingStatus}</span>
              </p>
            )}
            <label htmlFor="profile">
              <Edit />
            </label>
          </div>

          <input
            type="file"
            id="profile"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleProfileChange}
          />
        </ProfileWrapper>
        {profileFile && <p>{profileFile.name}</p>}
        <label>Name</label>
        <InputEl>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </InputEl>
        <label>Email</label>
        <InputEl>
          <input type="text" value={user?.email} disabled />
        </InputEl>
        <ButtonFlex>
          {user?.photoURL && (
            <ButtonEl
              type="button"
              className="btn-outline"
              onClick={handleClose}
            >
              Cancel
            </ButtonEl>
          )}
          <ButtonEl type="submit" disabled={loading}>
            {loading ? <DotLoader /> : "Update"}
          </ButtonEl>
        </ButtonFlex>
      </FormContainer>
    </MainContainer>
  );
}

export default UpdateProfile;
