import styled from "styled-components";
import Popup from "reactjs-popup";

export const StyledPopUp = styled(Popup)`
  &-content {
    width: 300px;
    height: 150px;
    box-shadow: var(--shadow);
    border-radius: var(--primary-border-radius);
    background-color: var(--primary-background-color);
    border: none;
  }
`;

export const ModalBody = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const ModalTitle = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: var(--primary-text-color);
`;

export const ModalButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const ModalButton = styled.button`
  height: var(--height35);
  width: var(--width80);
  border-radius: var(--primary-border-radius);
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  background-color: transparent;
  font-size: 12px;
  font-weight: 500;
  outline: none;

  &:nth-child(2) {
    background-color: var(--primary-color);
    color: #ffffff;
  }
`;

// Profile Modal Large

export const StyledModalLarge = styled(Popup)`
  &-content {
    margin: 0 0 !important;
    width: inherit;
    box-shadow: var(--shadow);
    padding: 0;
    border: none;

    @media screen and (max-width: 500px) {
      width: 100%;
    }
  }
`;