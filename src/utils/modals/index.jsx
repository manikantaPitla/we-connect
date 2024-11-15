import React from "react";
import {
  ModalBody,
  ModalButtonWrapper,
  ModalTitle,
  StyledModalLarge,
  ModalSmallCustomStyles,
} from "./style";
import "reactjs-popup/dist/index.css";
import { ButtonL } from "../../styles/commonStyles";

export function ModalSmall(props) {
  const { children, content, action } = props;
  const { title, buttonText } = content;

  return (
    <ModalSmallCustomStyles modal {...props}>
      {(close) => (
        <ModalBody>
          <ModalTitle>{title}</ModalTitle>
          <ModalButtonWrapper>
            <ButtonL $outline onClick={close}>
              Cancel
            </ButtonL>
            <ButtonL onClick={action}>{buttonText}</ButtonL>
          </ModalButtonWrapper>
          {children}
        </ModalBody>
      )}
    </ModalSmallCustomStyles>
  );
}

export function ModalLarge(props) {
  const { children } = props;

  return (
    <StyledModalLarge modal {...props}>
      {children}
    </StyledModalLarge>
  );
}
