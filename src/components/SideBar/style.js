import styled from "styled-components";
import { MainSharedContainer } from "../../styles/commonStyles";

export const SideBarWrapper = styled(MainSharedContainer)`
  width: 320px;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 800px) {
    width: 100%;
    flex: 1;
    padding: 10px 50px;
  }

  @media screen and (max-width: 500px) {
    padding: 10px;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media screen and (min-width: 900px) {
    flex-direction: column;
    gap: 10px;
  }

  hr {
    border: none;
    height: 1px;
    background-color: var(--secondary-light-color);
  }

  span {
    height: 45px;
    border-radius: var(--primary-border-radius);
  }
`;

export const UserListWrapper = styled.div`
  flex: 1;
`;
