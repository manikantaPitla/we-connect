import styled from "styled-components";
import { MainSharedContainer } from "../../styles/commonStyles";

export const SideBarWrapper = styled(MainSharedContainer)`
  width: 300px;
  flex-shrink: 0;
  flex: 1;
  padding: 10px;
  overflow-y: auto;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  hr {
    border: none;
    height: 1px;
    background-color: var(--secondary-light-color);
  }
`;

export const UserListWrapper = styled.div`
  flex: 1;
`;