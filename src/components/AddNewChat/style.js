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

  button {
    height: var(--height35);
    width: var(--width80);
    background-color: var(--primary-color);
    color: #ffffff;
    border: none;
    outline: none;
    border-radius: var(--primary-border-radius);
    font-size: 12px;
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

  li {
    background-color: var(--secondary-color);
    height: 70px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-radius: var(--primary-border-radius);
    color: var(--text-primary);
    cursor: pointer;

    &:hover {
      box-shadow: var(--shadow);
    }

    img {
      width: 50px;
      height: 50px;
      border-radius: 50px;
      object-fit: cover;
    }

    div {
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
  }
`;

export const ResponseMsg = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 12px;
  color: var(--text-secondary);
`;

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const SkeletonWrapper = styled.div`
  background-color: var(--secondary-color);
  height: 70px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  /* box-shadow: var(--shadow); */
  border-radius: var(--primary-border-radius);
  color: var(--text-primary);

  div {
    flex-grow: 1;
  }
`;
