import React from "react";
import {
  ModalBody,
  ModalButton,
  ModalButtonWrapper,
  ModalTitle,
  StyledPopUp,
} from "./style";
import "reactjs-popup/dist/index.css";

export function PopUpModal({ triggerElement, children, content, action }) {
  return (
    <StyledPopUp modal trigger={triggerElement}>
      {(close) => (
        <ModalBody>
          <ModalTitle>{content?.title}</ModalTitle>
          <ModalButtonWrapper>
            <ModalButton onClick={close}>Cancel</ModalButton>
            <ModalButton onClick={action}>{content?.buttonText}</ModalButton>
          </ModalButtonWrapper>
          {children}
        </ModalBody>
      )}
    </StyledPopUp>
  );
}
