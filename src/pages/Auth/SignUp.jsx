import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

import { signUpWithEmail } from "../../services/authServices";
import DotLoader from "../../components/Loader";
import { useLoading, useFormValidation } from "../../hooks";

function SignUp() {
  const [passwordType, setPasswordType] = useState("password");
  const [errorMessage, setErrorMessage] = useState("");

  const [loading, startLoading, stopLoading] = useLoading();
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const [onChangeCredentials, credentials, validate, validationError] =
    useFormValidation(initialValues);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const { name, email, password } = credentials;

    if (validate()) {
      startLoading();
      console.log(credentials);

      try {
        const user = await signUpWithEmail(name, email, password);
        console.log(user);
        navigate("/");
      } catch (error) {
        console.error(error.code);
        console.error(error.status);
        console.error(error.message);
        if (error.message == "Firebase: Error (auth/email-already-in-use).") {
          setErrorMessage("Email already in use");
        }
      } finally {
        stopLoading();
      }
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <AuthTitle>
        <h1>Welcome,</h1>
        <p>Create your account to get started.</p>
      </AuthTitle>
      <AuthInput>
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={credentials.name}
          onChange={onChangeCredentials}
          autoComplete="true"
        />
      </AuthInput>
      <AuthInput>
        <input
          type="text"
          placeholder="Email Address"
          name="email"
          value={credentials.email}
          onChange={onChangeCredentials}
          autoComplete="true"
        />
      </AuthInput>
      <AuthInput>
        <input
          type={passwordType}
          placeholder="Password"
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
      <AuthButton type="submit">
        {loading ? <DotLoader /> : "Create Account"}
      </AuthButton>
      <AuthOptions>
        <p>
          Already have an account? <Link to="/auth/signin">Sign In</Link>
        </p>
      </AuthOptions>
      <ErrorDisplay>{validationError || errorMessage}</ErrorDisplay>
    </FormWrapper>
  );
}

export default SignUp;
