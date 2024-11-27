import React, { memo, useEffect, useState } from "react";
import {
  FormContainer,
  MainContainer,
  ProfileWrapper,
  SuggestProfileUpdate,
  Title,
} from "./style";
import { useSelector } from "react-redux";
import { ButtonXl, InputEl } from "../../styles/commonStyles";
import { Edit, Warning2 } from "../../assets/icons";
import { useLoading, useAuthActions } from "../../hooks";
import {
  showError,
  showSuccess,
  updateUserProfile,
  uploadMedia,
  generateThumbnail,
  getUserProfileData,
} from "../../services";
import {
  CircleLoader,
  DotLoader,
  defaultProfileImage,
  defaultErrorImage,
} from "../../utils";

function UpdateProfile() {
  console.log("UpdateProfile");
  const currentUser = useSelector((state) => state.auth.user);

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

  const fetchUserProfileData = async () => {
    try {
      const userData = await getUserProfileData(currentUser?.userId);
      setUserProfile(userData);
    } catch (error) {
      console.error("Failed to load user profile: ", error);
    } finally {
      stopInitialLoad();
    }
  };

  useEffect(() => {
    fetchUserProfileData();
  }, [currentUser]);

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
    return await uploadMedia(
      currentUser?.userId,
      "profiles",
      file,
      (progress) => setImageUploadingStatus(`${progress}%`)
    );
  };

  const uploadThumbnailImage = async (file) => {
    const resizedThumbnailUrl = await generateThumbnail(file);
    return await uploadMedia(
      currentUser?.userId,
      "thumbnails",
      resizedThumbnailUrl
    );
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    const { userName } = userProfile;

    if (userName === currentUser.userName && fileToUpload === null) {
      showError("Make changes to update profile");
      return;
    }

    try {
      startUpdateLoading();

      let profileUploadURL;
      let thumbnailURL;

      if (fileToUpload !== null) {
        profileUploadURL = await uploadProfileImage(fileToUpload);

        const resizedProfileImage = await generateThumbnail(fileToUpload);

        thumbnailURL = await uploadThumbnailImage(resizedProfileImage);
      }

      const dataToUpdate = {};

      if (userName !== currentUser.userName) {
        dataToUpdate.userName = userName;
      }

      if (fileToUpload !== null) {
        dataToUpdate.photoURL = profileUploadURL;
        dataToUpdate.thumbnailURL = thumbnailURL;
      }

      if (Object.keys(dataToUpdate).length > 0) {
        await updateUserProfile(dataToUpdate, setUser);
      }

      showSuccess("Profile updated successfully.");
    } catch (error) {
      showError(error);
      console.error("Error updating profile: ", error);
    } finally {
      setImageUploadingStatus("");
      stopUpdateLoading();
      setFileToUpload(null);
    }
  };

  return (
    <MainContainer>
      {initialLoad ? (
        <CircleLoader />
      ) : (
        <>
          <Title>
            {userProfile.thumbnailURL ? "PROFILE" : "UPDATE PROFILE"}
          </Title>
          {!userProfile.thumbnailURL && (
            <SuggestProfileUpdate>
              <Warning2 size={18} />
              <p>Upload your profile photo!</p>
            </SuggestProfileUpdate>
          )}
          <FormContainer onSubmit={handleProfileUpdate}>
            <ProfileWrapper>
              <div>
                <img
                  src={userProfile.thumbnailURL || defaultProfileImage}
                  alt="user profile"
                  onError={(e) => (e.target.src = defaultErrorImage)}
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
                value={userProfile.userName}
                onChange={(e) =>
                  setUserProfile((prevState) => ({
                    ...prevState,
                    userName: e.target.value,
                  }))
                }
              />
            </InputEl>
            <label>Email</label>
            <InputEl>
              <input type="text" value={userProfile.email} disabled readOnly />
            </InputEl>
            <ButtonXl type="submit" disabled={updateLoading}>
              {updateLoading ? <DotLoader /> : "Update"}
            </ButtonXl>
          </FormContainer>
        </>
      )}
    </MainContainer>
  );
}

export default memo(UpdateProfile);
