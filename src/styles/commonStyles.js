import styled from "styled-components";

export const InputEl = styled.div`
  display: flex;
  align-items: center;
  border: var(--primary-border);
  height: var(--height45);
  border-radius: var(--primary-border-radius);
  overflow: hidden;
  color: var(--primary-text-color);

  input {
    padding: 0px 15px;
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

export const ButtonEl = styled.button`
  background-color: var(--primary-color);
  border-radius: var(--primary-border-radius);
  border: 1px solid var(--primary-color);
  height: var(--height45);
  width: 100%;
  font-size: 12px;
  color: #fff;
`;

// to be removed
export const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin: 5px 0px;
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
