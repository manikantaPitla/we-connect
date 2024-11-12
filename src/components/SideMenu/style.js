import styled from "styled-components";
import { MainSharedContainer } from "../../styles/commonStyles";

export const SideMenuWrapper = styled(MainSharedContainer)`
  padding: 10px 15px;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  width: 80px;

  img {
    width: 45px;
    height: 45px;
  }

  @media screen and (max-width: 950px) {
    border-right: var(--primary-border);
    width: 65px;
  }

  @media screen and (min-width: 800px) {
    flex: 0;
    flex-direction: column;
    justify-content: space-between;
  }

  @media screen and (max-width: 600px) {
    flex: 1;
    border: none;
  }

  @media screen and (max-width: 450px) {
    flex-direction: row;
    order: 1;
    padding: 15px;

    img {
      display: none;
    }
  }
`;

export const MenuItemsWrapper = styled.ul`
  display: flex;
  gap: 10px;
  list-style: none;
  flex-shrink: 0;
  flex-direction: column;

  @media screen and (max-width: 450px) {
    flex: 1;
    flex-direction: row;
    justify-content: space-around;
  }

  .active {
    color: #ffffff;
    background-color: var(--primary-color);
  }
`;

export const MenuItem = styled.li`
  cursor: pointer;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--primary-border-radius);
  color: var(--primary-text-color);

  @media screen and (max-width: 950px) {
    height: 45px;
    width: 45px;
  }

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
