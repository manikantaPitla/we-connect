import styled from "styled-components";

export const HomeContainer = styled.div`
  height: 100vh;
  background-color: var(--secondary-background-color);
  color: var(--primary-text-color);
  display: flex;
  align-items: stretch;
  padding: 15px;
  gap: 10px;

  @media screen and (max-width: 500px) {
    flex-direction: column;
    overflow-y: auto;
  }
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
