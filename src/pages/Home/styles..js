import styled from "styled-components";

export const HomeContainer = styled.div`
  height: 100vh;
  background-color: var(--secondary-background-color);
  color: var(--primary-text-color);
  display: flex;
  flex-direction: row;
  align-items: stretch;
  overflow-y: auto;
  padding: 15px;
  gap: 10px;

  @media screen and (max-width: 950px) {
    padding: 0;
    gap: 0;
  }

  @media screen and (max-width: 450px) {
    flex-direction: column;
  }
`;

export const FlexColumn = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;

  @media screen and (max-width: 950px) {
    gap: 0;
    border-right: var(--primary-border);
  }

  @media screen and (max-width: 500px) {
    gap: 0;
    border: none;
    flex: 1;
  }
`;

export const ComponentWrapper = styled.div`
  display: flex;

  @media screen and (max-width: 950px) {
    border-right: var(--primary-border);
  }
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }

  @media screen and (max-width: 450px) {
    flex-direction: row;
    order: 1;
    border: none;
    border-top: var(--primary-border);
  }
`;
