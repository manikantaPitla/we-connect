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
import defaultProfileImage from "../../assets/images/default-user.webp";
import { Edit, Warning2 } from "../../assets/icons";
import { useLoading, useAuthActions } from "../../hooks";
import {
  showError,
  showSuccess,
  updateUserProfile,
  uploadMedia,
  generateThumbnail,
  getUserData,
} from "../../services";
import { DotLoader } from "../Loader";

function UpdateProfile({ closeModal }) {
  console.log("UpdateProfile");
  const user = useSelector((state) => state.auth.user);

  const [userProfile, setUserProfile] = useState({});

  const [fileToUpload, setFileToUpload] = useState(null);

  const [imageUploadingStatus, setImageUploadingStatus] = useState("");

  const { loading: initialLoad, stopLoading: stopInitialLoad } =
    useLoading(true);

  const {
    loading: updateLoading,
    startLoading: startUpdateLoading,
    stopLoading: stopUpdateLoading,
  } = useLoading();

  const { setUser } = useAuthActions();

  const fetchUser = async () => {
    try {
      const userData = await getUserData(user.uid);
      console.log(userData);
      setUserProfile(userData);
    } catch (error) {
    } finally {
      stopInitialLoad();
    }
  };

  useEffect(() => {
    fetchUser();
  }, [user]);

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserProfile((prevState) => ({
          ...prevState,
          thumbnailUrl: reader.result,
        }));
        setFileToUpload(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadProfileImage = async (file) => {
    return await uploadMedia(user.uid, "profiles", file, (progress) =>
      setImageUploadingStatus(`${progress}%`)
    );
  };

  const uploadThumbnailUrlImage = async (file) => {
    const resizedThumbnailUrl = await generateThumbnail(file);
    return await uploadMedia(user.uid, "thumbnails", resizedThumbnailUrl);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    const { displayName } = userProfile;

    if (displayName === user.displayName && fileToUpload === null) {
      showError("Make changes to update profile");
      return;
    }

    console.log({ displayName, fileToUpload });

    try {
      startUpdateLoading();

      let profileUploadUrl;
      let thumbnailUrlurl;

      if (fileToUpload !== null) {
        profileUploadUrl = await uploadProfileImage(fileToUpload);

        const resizedProfileImage = await generateThumbnail(fileToUpload);

        thumbnailUrlurl = await uploadThumbnailUrlImage(resizedProfileImage);
      }

      const dataToUpdate = {};

      if (displayName !== user.displayName) {
        dataToUpdate.displayName = displayName;
      }

      if (fileToUpload !== null) {
        dataToUpdate.photoURL = profileUploadUrl;
        dataToUpdate.thumbnailUrl = thumbnailUrlurl;
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
      stopUpdateLoading();
    }
  };

  return (
    <StyledLargeModal>
      {initialLoad ? (
        "loading..."
      ) : (
        <>
          <Title>
            {userProfile.thumbnailUrl ? "PROFILE" : "UPDATE PROFILE"}
          </Title>
          {!userProfile.thumbnailUrl && (
            <SuggestProfileUpdate>
              <Warning2 size={18} />
              <p>Complete your profile with a profile pic</p>
            </SuggestProfileUpdate>
          )}
          <FormContainer onSubmit={handleProfileUpdate}>
            <ProfileWrapper>
              <div>
                <img
                  src={userProfile.thumbnailUrl || defaultProfileImage}
                  alt="user profile"
                />
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
            {fileToUpload && <p>{fileToUpload.name}</p>}
            <label>Name</label>
            <InputEl>
              <input
                type="text"
                value={userProfile.displayName}
                onChange={(e) =>
                  setUserProfile((prevState) => ({
                    ...prevState,
                    displayName: e.target.value,
                  }))
                }
              />
            </InputEl>
            <label>Email</label>
            <InputEl>
              <input type="text" value={userProfile.email} disabled />
            </InputEl>
            <ButtonFlex>
              <ButtonXl
                type="button"
                className="btn-outline"
                onClick={closeModal}
              >
                Cancel
              </ButtonXl>

              <ButtonXl type="submit" disabled={updateLoading}>
                {updateLoading ? <DotLoader /> : "Update"}
              </ButtonXl>
            </ButtonFlex>
          </FormContainer>
        </>
      )}
    </StyledLargeModal>
  );
}

export default memo(UpdateProfile);
