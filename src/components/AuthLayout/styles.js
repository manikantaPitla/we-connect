import styled from "styled-components";

export const AuthContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  overflow: hidden;

  p,
  a {
    font-size: 12px;
  }
`;

export const ImageWrapper = styled.div`
  flex: 1;
  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }

  display: none;
  @media screen and (min-width: 768px) {
    display: block;
  }
`;

export const FormContainer = styled.div`
  background-color: var(--background-color);
  color: var(--text-primary);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 120px 25px;
  gap: 60px;

  @media screen and (min-width: 600px) {
    padding: 120px 70px;
    min-width: 500px;
    align-items: center;
  }
  @media screen and (min-width: 768px) {
    padding: 120px 50px;
    align-items: stretch;
    width: 500px;
    min-width: 500px;
  }
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media screen and (min-width: 600px) {
    width: 80%;
  }
  @media screen and (min-width: 768px) {
    width: 100%;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  gap: 10px;
  align-items: center;

  h1 {
    font-size: 22px;
    span {
      color: var(--primary);
    }
  }
`;

export const AuthTitle = styled.div`
  /* margin-bottom: 20px; */
  h1 {
    font-size: 20px;
    margin-bottom: 5px;
  }
`;

export const AuthInput = styled.div`
  display: flex;
  gap: 5px;

  border: var(--border);
  height: 45px;
  border-radius: 16px;
  overflow: hidden;

  input {
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    flex-grow: 1;
    padding: 0px 15px;
    font-size: 12px;
    font-weight: 500;
    background-color: transparent;
    color: var(--text-primary);
  }
`;

export const PasswordTypeButton = styled.button`
  padding: 0px 15px;
  color: var(--line);

  svg {
    font-size: 16px;
  }
`;

export const AuthButton = styled.button`
  height: var(--height);
  width: 100%;
  background-color: var(--primary);
  color: #ffffff;
  border-radius: var(--radius);
  font-size: 12px;
  border: none;
  border: 1px solid var(--primary);
`;

export const AuthOptions = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ErrorDisplay = styled.p`
  color: red;
  text-align: center;
  margin: 5px 0px;
`;
