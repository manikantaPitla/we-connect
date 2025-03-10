import React, { forwardRef } from "react";
import {
  ModalBody,
  ModalButtonWrapper,
  ModalTitle,
  StyledModalLarge,
  ModalSmallCustomStyles,
  SmallModalMenu,
  ModalViewMediaWrapper,
  ModalSmallCustomPopupStyles,
} from "./style";
import "reactjs-popup/dist/index.css";
import { ButtonL, ButtonXl } from "../../styles/commonStyles";

export const PasswordEmailSentSuccessModal = ({ open, onClose, mailId }) => (
  <ModalSmallCustomPopupStyles modal open={open} onClose={onClose}>
    <div>
      <p>
        Password reset link sent to your email <span>{mailId}</span>
      </p>
      <p className="mail-note">
        If an account is associated with this email, you will receive a password
        reset link. Please check your inbox (and spam folder) for further
        instructions.
      </p>
      <ButtonL $outline onClick={onClose}>
        OK
      </ButtonL>
    </div>
  </ModalSmallCustomPopupStyles>
);

export function ModalSmall(props) {
  const { children, content, action } = props;
  const { title, buttonText } = content;

  return (
    <ModalSmallCustomStyles modal {...props} closeOnDocumentClick={false}>
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

export const ModalMenu = forwardRef((props, ref) => {
  return <SmallModalMenu offsetY={20} ref={ref} {...props}></SmallModalMenu>;
});

export function ModalViewMedia(props) {
  const { children, action = null, ...propsData } = props;

  const handleAction = (closeModal) => {
    if (action === null) return;

    action();
    closeModal();
  };

  return (
    <ModalViewMediaWrapper modal {...propsData} closeOnDocumentClick={false}>
      {(close) => (
        <>
          <div className="modal-content">
            {children}
            <div className="button-wrapper">
              <ButtonXl onClick={close}>Close</ButtonXl>
              {action !== null && (
                <ButtonXl onClick={() => handleAction(close)}>
                  Clear Media
                </ButtonXl>
              )}
            </div>
          </div>
        </>
      )}
    </ModalViewMediaWrapper>
  );
}
