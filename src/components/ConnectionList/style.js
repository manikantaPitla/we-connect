import styled from "styled-components";

export const ConnectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  h4 {
    font-size: 14px;
    font-weight: 500;
  }
`;

export const TabWrapper = styled.div`
  display: flex;
  gap: 10px;

  button {
    flex-grow: 1;
    color: var(--primary-text-color);
    padding: 15px 10px;
  }

  .active-tab {
    border-bottom: 1px solid var(--primary-color);
  }

  span {
    flex-grow: 1;
    height: 40px;
  }
`;

export const UserItemsContainer = styled.ul``;

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
