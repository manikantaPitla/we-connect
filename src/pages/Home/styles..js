import styled from "styled-components";
// import Popup from "reactjs-popup";

export const HomeContainer = styled.div`
  height: 100vh;
  background-color: var(--secondary-light);
  display: flex;
  align-items: stretch;
  padding: 15px;
  gap: 10px;

  @media screen and (max-width: 500px) {
    flex-direction: column;
    overflow-y: auto;
  }
`;