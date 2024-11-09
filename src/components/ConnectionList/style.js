import styled from "styled-components";

export const ConnectionContainer = styled.div`
  display: flex;
  padding: 10px 0;
  flex-direction: column;
  gap: 20px;
  flex: 1;

  h4 {
    font-size: 14px;
    font-weight: 500;
  }
`;

export const TabWrapper = styled.div`
  display: flex;
  gap: 10px;

  button {
    width: 100%;
    color: var(--primary-text-color);
    height: 40px;
    border-radius: var(--primary-border-radius);
  }

  .active-tab {
    background-color: var(--primary-color);
    color: #fff;
    border-bottom: 1px solid var(--primary-color);
  }

  span {
    flex-grow: 1;
    height: 40px;
  }
`;

export const UserItemsContainer = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const UserItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;

  img {
    height: 50px;
    width: 50px;
    object-fit: cover;
    border-radius: 50%;
  }

  p {
    flex-grow: 1;
    font-size: var(--fs-14);
  }

  div {
    display: flex;
    gap: 10px;
  }
`;
