import styled from "styled-components";
import Popup from "reactjs-popup";

export const StyledPopUp = styled(Popup)`
  &-content {
    width: 300px;
    height: 150px;
    box-shadow: var(--shadow);
    border-radius: var(--radius);
    background-color: var(--background-color);
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
  color: var(--text-primary);
`;

export const ModalButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const ModalButton = styled.button`
  height: var(--height35);
  width: var(--width80);
  border-radius: var(--radius);
  border: 1px solid var(--primary);
  color: var(--primary);
  background-color: transparent;
  font-size: 12px;
  font-weight: 500;
  outline: none;

  &:nth-child(2) {
    background-color: var(--primary);
    color: #ffffff;
  }
`;
