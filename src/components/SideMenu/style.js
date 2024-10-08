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
  height: 45px;
  width: 45px !important;
`;

export const MenuItemsWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-left: 0;
  list-style: none;
  flex-shrink: 0;
  color: var(--text-primary);

  @media screen and (max-width: 500px) {
    flex-direction: row;
    gap: 15px;
  }

  .active {
    color: #ffffff;
    background-color: var(--primary);
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
  border-radius: var(--radius);
  color: var(--text-primary);

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    background-color: var(--primary-light);
  }
`;
