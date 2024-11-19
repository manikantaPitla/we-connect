import styled from "styled-components";
import { MainSharedContainer } from "../../styles/commonStyles";

export const SideMenuWrapper = styled(MainSharedContainer)`
  padding: 10px 15px;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  width: 80px;

  @media screen and (max-width: 800px) {
    width: 200px;
    align-items: stretch;
  }

  @media screen and (max-width: 600px) {
    flex: 1;
    border: none;
    width: 80px;
  }

  @media screen and (max-width: 450px) {
    flex-direction: row;
    padding: 15px;

    .page-logo {
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
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: ${(props) =>
    props.$circle ? "50px" : "var(--primary-border-radius)"};
  color: var(--primary-text-color);

  .page-logo {
    width: 50px;
    height: 100%;
  }
`;

export const MenuContent = styled.div`
  display: none;

  @media screen and (max-width: 800px) {
    display: block;
    flex: 1;

    p {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export const MenuIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 100%;
  svg {
    width: 18px;
    height: 18px;
  }
`;

export const SkeletonMenu = styled(MenuItemsWrapper)`
  span {
    height: 50px;
    width: 100%;
    border-radius: var(--primary-border-radius);
  }

  @media screen and (max-width: 450px) {
    span {
      width: 50px;
    }
  }
`;
