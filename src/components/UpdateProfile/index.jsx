import React, { memo, useEffect, useState } from "react";
import {
  ButtonFlex,
  FormContainer,
  ProfileWrapper,
  SuggestProfileUpdate,
  Title,
} from "./style";
import { useSelector } from "react-redux";
import { ButtonXl, InputEl, StyledLargeModal } from "../../styles/commonStyles";
import defaultImage from "../../assets/images/default-user.webp";
import { Edit, Warning2 } from "../../assets/icons";
import { useLoading, useAuthActions } from "../../hooks";
import {
  showError,
  showSuccess,
  updateUserProfile,
  uploadMedia,
  generateThumbnail,
} from "../../services";
import { DotLoader } from "../Loader";

function UpdateProfile({ closeModal }) {
  console.log("UpdateProfile");
  const user = useSelector((state) => state.auth.user);

  const [profileImage, setProfileImage] = useState(
    user?.thumbnail || defaultImage
  );
  const [profileFile, setProfileFile] = useState(null);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [imageUploadingStatus, setImageUploadingStatus] = useState("");

  const [loading, startLoading, stopLoading] = useLoading();
  const { setUser } = useAuthActions();

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setProfileImage(user.thumbnail || defaultImage);
    }
  }, [user]);

  const handleClose = () => {
    setProfileFile(null);
    setDisplayName(user?.displayName || "");
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

  const uploadProfileImage = async (file) => {
    return await uploadMedia(user.uid, "profiles", file, (progress) =>
      setImageUploadingStatus(`${progress}%`)
    );
  };

  const uploadThumbnailImage = async (file) => {
    const resizedThumbnail = await generateThumbnail(file);
    return await uploadMedia(user.uid, "thumbnails", resizedThumbnail);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    if (
      (profileImage === user.thumbnail || profileImage === defaultImage) &&
      displayName === user.displayName
    ) {
      showError("Please make some changes to update profile.");
      return;
    }

    try {
      startLoading();

      let profileUploadUrl;
      let thumbnailurl;

      if (profileImage !== defaultImage && profileImage !== user.thumbnail) {
        profileUploadUrl = await uploadProfileImage(profileFile);
        const resizedProfileImage = await generateThumbnail(profileFile);
        thumbnailurl = await uploadThumbnailImage(resizedProfileImage);
      }

      const dataToUpdate = {};

      if (displayName !== user.displayName) {
        dataToUpdate.displayName = displayName;
      }

      if (profileImage !== user.thumbnail) {
        dataToUpdate.photoURL = profileUploadUrl;
        dataToUpdate.thumbnail = thumbnailurl;
      }

      if (Object.keys(dataToUpdate).length > 0) {
        await updateUserProfile(dataToUpdate, setUser);
      }
      showSuccess("Profile updated successfully.");
      closeModal();
    } catch (error) {
      showError(error);
      console.error("Error updating profile:", error);
    } finally {
      stopLoading();
    }
  };

  return (
    <StyledLargeModal>
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
            <ButtonXl
              type="button"
              className="btn-outline"
              onClick={handleClose}
            >
              Cancel
            </ButtonXl>
          )}
          <ButtonXl type="submit" disabled={loading || !displayName}>
            {loading ? <DotLoader /> : "Update"}
          </ButtonXl>
        </ButtonFlex>
      </FormContainer>
    </StyledLargeModal>
  );
}

export default memo(UpdateProfile);
