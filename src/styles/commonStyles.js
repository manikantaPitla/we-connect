import styled from "styled-components";

export const InputEl = styled.div`
  height: var(--height45);
  border: var(--primary-border);
  border-radius: var(--primary-border-radius);
  color: var(--primary-text-color);
  display: flex;
  align-items: center;
  overflow: hidden;

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
  width: 60px;
`;

export const TitleWrapper = styled.div`
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

export const MainSharedContainer = styled.div`
  background-color: var(--primary-background-color);
  box-shadow: var(--shadow);
  border-radius: var(--primary-border-radius);
  display: flex;
  flex-direction: column;
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
