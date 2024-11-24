import styled from "styled-components";

// **************Auth Layout Styles******************

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  @media screen and (max-width: 800px) {
    width: 65%;
  }

  @media screen and (max-width: 600px) {
    width: 80%;
  }

  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

export const TitleWrapper = styled.div`
  h1 {
    font-size: 20px;
    margin-bottom: 5px;
  }
`;

export const GreetContainer = styled.div`
  h1 {
    font-size: 20px;
    margin-bottom: 5px;
  }
`;

export const OptionsWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: var(--secondary-text-color);
`;

export const InputEl = styled.div`
  height: var(--height45);
  border: var(--primary-border);
  border-radius: var(--primary-border-radius);
  color: var(--primary-text-color);
  display: flex;
  align-items: center;
  overflow: hidden;
  flex-shrink: 0;

  input {
    padding: 0px ${(props) => (props.$nospace ? "0px" : "15px")};
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    flex-grow: 1;
    font-size: 12px;
    font-weight: 500;
    background-color: transparent;
    color: var(--primary-text-color);
  }

  svg {
    margin: 0 15px;
    color: var(--secondary-text-color);
    height: 1.3em;
    width: 1.3em;
  }
`;

export const ButtonXl = styled.button`
  background-color: ${(props) =>
    props.$outline ? "transparent" : "var(--primary-color)"};
  border-radius: var(--primary-border-radius);
  border: 1px solid var(--primary-color);
  height: var(--height45);
  width: 100%;
  font-size: 12px;
  color: ${(props) => (props.$outline ? "var(--primary-color)" : "#fff")};
`;

export const ButtonL = styled(ButtonXl)`
  height: var(--height35);
  width: var(--width80);
  flex-shrink: 0;
`;

export const ButtonM = styled(ButtonL)`
  height: 30px;
  width: 70px;
`;

export const MainSharedContainer = styled.section`
  display: flex;
  background-color: var(--primary-background-color);
  border-radius: var(--primary-border-radius);
  box-shadow: var(--shadow);

  @media screen and (min-width: 950px) {
    border: none;
  }

  @media screen and (max-width: 450px) {
    border-radius: none;
    box-shadow: none;
  }
`;

export const StyledLargeModal = styled.div`
  background-color: var(--primary-background-color);
  color: var(--primary-text-color);
  height: 100%;
  width: 380px;
  box-shadow: var(--shadow);
  overflow-y: auto;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

export const ImageSmall = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  object-fit: cover;
  background-color: #fff;

  /* @media screen and (max-width: 950px) {
    height: 45px;
    width: 45px;
  } */
`;
