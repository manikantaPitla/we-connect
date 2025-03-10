import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ButtonXl,
  InputEl,
  TitleWrapper,
  OptionsWrapper,
  FormContainer,
} from "../../styles/commonStyles";
import { DotLoader, PasswordEmailSentSuccessModal } from "../../utils";
import { sendResetPasswordLink, showError } from "../../services";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      showError("Email is required!");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError("Enter a valid email address");
      return;
    }

    try {
      await sendResetPasswordLink(email);
      setModalOpen(true);
      setEmail("");
    } catch (error) {
      showError("Failed to send reset link. Try again!");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <TitleWrapper>
        <h1>Forgot Password</h1>
      </TitleWrapper>
      <InputEl>
        <input
          type="email"
          placeholder="Enter your email address"
          autoComplete="true"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputEl>
      <ButtonXl type="submit">Send Link</ButtonXl>
      <PasswordEmailSentSuccessModal
        open={isModalOpen}
        mailId={email}
        onOpen={() => setModalOpen(true)}
        onClose={() => setModalOpen(false)}
      />
      <OptionsWrapper>
        <p>
          Go Back? <Link to="/auth/signin">Sign In</Link>
        </p>
      </OptionsWrapper>
    </FormContainer>
  );
}

export default ForgotPassword;
