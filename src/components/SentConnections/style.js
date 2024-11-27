import styled from "styled-components";

export const UserItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0px;

  p {
    flex-grow: 1;
    font-size: var(--fs-14);
  }

  div {
    display: flex;
    gap: 10px;
  }
`;

export const NoRequestsWrapper = styled.div`
  flex: 1;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SkeletonWrapper = styled(UserItem)``;
