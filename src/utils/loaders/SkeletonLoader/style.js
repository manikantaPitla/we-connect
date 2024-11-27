import styled from "styled-components";
import { UserItem as ReceivedUserItem } from "../../../components/ReceivedConnections/style";
import { UserItem as SentUserItem } from "../../../components/SentConnections/style";

// SEARCH USER LOADING STYLES ********************************

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
// RECEIVED REQUESTS LOADING STYLES ********************************

export const ReceivedConnectionsSkeletonWrapper = styled(ReceivedUserItem)``;

// SENT REQUESTS LOADING STYLES ********************************

export const SentConnectionsSkeletonWrapper = styled(SentUserItem)``;
