import styled from "styled-components";

export const SideBarWrapper = styled.div`
  background-color: var(--background-color);
  width: 80px;
  padding: 15px 0;
  border-radius: var(--radius);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--shadow);
  color: white;

  img {
    cursor: pointer;
    border-radius: 16px;
    height: 45px;
    width: 45px !important;
  }

  @media screen and (max-width: 500px) {
    order: 1;
    flex-direction: row;
    width: 100%;
    padding: 10px 15px;
  }
`;
