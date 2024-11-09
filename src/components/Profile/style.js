import styled from "styled-components";
import { MainSharedContainer } from "../../styles/commonStyles";

export const ProfileWrapper = styled(MainSharedContainer)`
  cursor: pointer;
  padding: 10px;
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  div {
    display: block;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 3px;

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
