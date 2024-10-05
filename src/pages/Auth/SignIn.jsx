import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import {
  AuthButton,
  AuthInput,
  AuthTitle,
  AuthOptions,
  FormWrapper,
  PasswordTypeButton,
  ErrorDisplay,
} from "../../components/AuthLayout/styles";
import { useLoading, useFormValidation } from "../../hooks";
import { DotLoader } from "../../components/Loader";

function SignIn() {
  const [passwordType, setPasswordType] = useState("password");

  const [loading, startLoading, stopLoading] = useLoading();

  const initialValues = {
    email: "",
    password: "",
  };

  const [onChangeCredentials, credentials, validate, validationError] =
    useFormValidation(initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log(credentials);
      startLoading();
      try {
      } catch (error) {
      } finally {
        stopLoading();
      }
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <AuthTitle>
        <h1>Chat Awaits You!</h1>
        <p>Sign in to connect with your beloved ones.</p>
      </AuthTitle>
      <AuthInput>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={credentials.email}
          onChange={onChangeCredentials}
          autoComplete="true"
        />
      </AuthInput>
      <AuthInput>
        <input
          type={passwordType}
          placeholder="password"
          name="password"
          value={credentials.password}
          onChange={onChangeCredentials}
        />
        <PasswordTypeButton
          type="button"
          onClick={() => {
            passwordType === "password"
              ? setPasswordType("text")
              : setPasswordType("password");
          }}
        >
          {passwordType === "password" ? <IoEyeOutline /> : <IoEyeOffOutline />}
        </PasswordTypeButton>
      </AuthInput>
      <AuthButton type="submit">{loading ? <DotLoader /> : "Login"}</AuthButton>
      <AuthOptions>
        <Link to="/auth/forgotpassword">Forgot your password?</Link>
        <p>
          New to We Connect? <Link to="/auth/signup">Create an Account!</Link>
        </p>
      </AuthOptions>
      <ErrorDisplay>{validationError}</ErrorDisplay>
    </FormWrapper>
  );
}

export default SignIn;
