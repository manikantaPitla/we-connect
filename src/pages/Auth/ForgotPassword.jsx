import React from "react";
import { Link } from "react-router-dom";
import {
  ButtonXl,
  InputEl,
  TitleWrapper,
  OptionsWrapper,
  FormWrapper,
} from "../../styles/commonStyles";

function ForgotPassword() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <TitleWrapper>
        <h1>Forgot Password</h1>
      </TitleWrapper>
      <InputEl>
        <input
          type="email"
          placeholder="Enter your email address"
          autoComplete="true"
        />
      </InputEl>
      <ButtonXl type="submit">Send Code</ButtonXl>
      <OptionsWrapper>
        <p>
          Go Back? <Link to="/auth/signin">Sign In</Link>
        </p>
      </OptionsWrapper>
    </FormWrapper>
  );
}

export default ForgotPassword;
