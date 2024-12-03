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
    object-fit: cover !important;
    height: 100% !important;
    width: 100% !important;
    object-position: 80% !important;
  }

  @media screen and (max-width: 800px) {
    display: none;
  }

  @media screen and (max-width: 900px) {
    img {
      object-position: 75% !important;
    }
  }
`;

export const FormWrapper = styled.div`
  background-color: var(--primary-background-color);
  color: var(--primary-text-color);
  display: flex;
  flex-direction: column;
  gap: 60px;

  padding: 120px 50px;
  align-items: stretch;
  min-width: 500px;

  @media screen and (max-width: 800px) {
    align-items: center;
    min-width: 100%;
  }

  @media screen and (max-width: 600px) {
    padding: 120px 30px;
  }

  @media screen and (max-width: 500px) {
    padding: 120px 20px;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  gap: 10px;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }

  h1 {
    font-size: 22px;
    span {
      color: var(--primary-color);
    }
  }
`;

export const ThemeWrapper = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;
  width: 45px;
  height: 45px;
  border-radius: 50px;
  background-color: var(--secondary-background-color);
`;
