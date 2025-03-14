import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--primary-text-color);

  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  p {
    font-size: 14px;
  }
`;

export const SearchContainer = styled.form`
  button {
    height: 100%;
    background-color: transparent;
    border: none;
    outline: none;
  }

  svg {
    transform: rotate(90deg);
  }
`;

export const SearchLogo = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 200px;
  }
`;

export const SearchUsersList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const UserListItem = styled.li`
  background-color: var(--secondary-color);
  height: 70px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: var(--primary-border-radius);
  color: var(--text-primary);

  div {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;

    h1 {
      font-size: 14px;
      font-weight: 500;
    }

    p {
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color);
    }
  }
`;

export const ResponseMsg = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 12px;
  color: var(--text-secondary);
`;
