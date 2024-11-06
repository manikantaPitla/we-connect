import React from "react";
import {
  ModalBody,
  ModalButtonWrapper,
  ModalTitle,
  StyledModalLarge,
  StyledPopUp,
} from "./style";
import "reactjs-popup/dist/index.css";
import { ButtonL } from "../../styles/commonStyles";

export function PopUpModalSmall(props) {
  const { children, content, action } = props;

  return (
    <StyledPopUp modal {...props}>
      {(close) => (
        <ModalBody>
          <ModalTitle>{content?.title}</ModalTitle>
          <ModalButtonWrapper>
            <ButtonL $outline onClick={close}>
              Cancel
            </ButtonL>
            <ButtonL onClick={action}>{content?.buttonText}</ButtonL>
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
