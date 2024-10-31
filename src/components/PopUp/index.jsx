import React from "react";
import {
  ModalBody,
  ModalButton,
  ModalButtonWrapper,
  ModalTitle,
  StyledModalLarge,
  StyledPopUp,
} from "./style";
import "reactjs-popup/dist/index.css";

export function PopUpModalSmall(props) {
  const { children, content, action } = props;

  return (
    <StyledPopUp modal {...props}>
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

export function PopUpModalLarge(props) {
  const { children } = props;

  return (
    <StyledModalLarge modal {...props}>
      {children}
    </StyledModalLarge>
  );
}
