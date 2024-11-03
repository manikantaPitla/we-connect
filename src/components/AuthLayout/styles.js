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
  display: none;

  @media screen and (min-width: 768px) {
    flex: 1;
    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
      object-position: 80%;
    }
    display: block;
  }

  @media screen and (min-width: 1100px) {
    img {
      object-position: 90%;
    }
  }
`;

export const FormContainer = styled.div`
  background-color: var(--primary-background-color);
  color: var(--primary-text-color);
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
