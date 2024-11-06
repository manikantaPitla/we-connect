import styled from "styled-components";
import { MainSharedContainer } from "../../styles/commonStyles";

export const SideMenuWrapper = styled(MainSharedContainer)`
  width: 80px;
  padding: 15px 0;
  align-items: center;
  justify-content: space-between;
  user-select: none;

  @media screen and (max-width: 500px) {
    order: 1;
    flex-direction: row;
    width: 100%;
    padding: 10px 15px;
  }
`;

export const LogoImage = styled.img`
  cursor: pointer;
  border-radius: 16px;
  height: 50px;
  width: 50px !important;
`;

export const MenuItemsWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-left: 0;
  list-style: none;
  flex-shrink: 0;

  @media screen and (max-width: 500px) {
    flex-direction: row;
    gap: 15px;
  }

  .active {
    color: #ffffff;
    background-color: var(--primary-color);
  }
`;

export const MenuItem = styled.li`
  padding: 10px;
  cursor: pointer;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--primary-border-radius);
  color: var(--primary-text-color);

  svg {
    width: 18px;
    height: 18px;
    /* &:hover {
      color: var(--primary-color);
    } */
  }
`;

export const SkeletonMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  @media screen and (max-width: 500px) {
    flex-direction: row;
    gap: 15px;
  }

  span {
    height: 50px;
    width: 50px;
    border-radius: var(--primary-border-radius);
  }
`;
