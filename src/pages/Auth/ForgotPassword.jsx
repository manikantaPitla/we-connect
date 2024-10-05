import React from "react";
import {
  AuthButton,
  AuthInput,
  AuthOptions,
  AuthTitle,
  FormWrapper,
} from "../../components/AuthLayout/styles";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <AuthTitle>
        <h1>Forgot Password</h1>
      </AuthTitle>
      <AuthInput>
        <input
          type="email"
          placeholder="Enter your email address"
          autoComplete="true"
        />
      </AuthInput>
      <AuthButton type="submit">Send Code</AuthButton>
      <AuthOptions>
        <p>
          Go Back? <Link to="/auth/signin">Sign In</Link>
        </p>
      </AuthOptions>
    </FormWrapper>
  );
}

export default ForgotPassword;
