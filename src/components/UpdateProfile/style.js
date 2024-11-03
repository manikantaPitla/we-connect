import styled from "styled-components";

export const MainContainer = styled.div`
  background-color: var(--primary-background-color);
  color: var(--primary-text-color);
  height: 100%;
  width: 420px;
  box-shadow: var(--shadow);
  overflow-y: auto;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media screen and (max-width: 500px) {
    width: 100%;
  }

  p {
    font-size: 12px;
    font-weight: 500;
  }
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;

  p {
    font-size: 12px;
    text-align: center;
    word-wrap: break-word;
  }

  label {
    font-size: 12px;
    font-weight: 500;
  }

  input:disabled {
    color: var(--secondary-text-color);
    cursor: no-drop;
  }

  button {
    margin-top: 10px;
  }
`;

export const ProfileWrapper = styled.div`
  /* align-self: center; */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  label {
    cursor: pointer;
  }

  div {
    flex-shrink: 0;
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50px;

    img {
      border-radius: 50px;
      width: inherit;
      height: inherit;
      object-fit: cover;
      object-position: center;
      align-self: center;
    }

    label {
      width: 40px;
      height: 40px;
      position: absolute;
      border-radius: 50px;
      bottom: -5%;
      right: -5%;
      background-color: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      svg {
        width: 16px;
        height: 16px;
      }
    }
  }

  p {
    width: 100%;
    height: 100%;
    background-color: var(--primary-light-color);
    position: absolute;
    left: 0;
    top: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;

    span {
      font-size: 16px;
      color: #fff;
    }
  }
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const SuggestProfileUpdate = styled.div`
  background-color: var(--primary-light-color);
  padding: 10px 15px;
  height: var(--height45);
  border-radius: var(--primary-border-radius);

  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--primary-text-color);
  font-size: 12px;
`;

export const ButtonFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  button {
    flex: 1;

    &.btn-outline {
      border: 1px solid var(--primary-color);
      background-color: transparent;
      color: var(--primary-color);
    }
  }
`;