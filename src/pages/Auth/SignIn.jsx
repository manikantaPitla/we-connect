import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeSlash } from "../../assets/icons";
import {
  ButtonXl,
  InputEl,
  TitleWrapper,
  OptionsWrapper,
  FormContainer,
} from "../../styles/commonStyles";
import { useLoading, useFormValidation } from "../../hooks";
import { DotLoader } from "../../utils";
import { signInWithEmail, showError } from "../../services";

function SignIn() {
  const [passwordType, setPasswordType] = useState("password");

  const { loading, stopLoading, startLoading } = useLoading();

  const initialValues = {
    email: "",
    password: "",
  };

  const [onChangeCredentials, credentials, setCredentials, validate] =
    useFormValidation(initialValues, showError);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        startLoading();
        await signInWithEmail(credentials.email, credentials.password);
        setCredentials(initialValues);
        navigate("/");
      } catch (error) {
        switch (error.code) {
          case "auth/network-request-failed":
            showError("Check your network connection");
            break;
          case "auth/invalid-credential":
            showError("Invalid Email or Password");
            break;
          default:
            showError("Something went wrong!");
        }
      } finally {
        stopLoading();
      }
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <TitleWrapper>
        <h1>Chat Awaits You!</h1>
        <p>Sign in to connect with your beloved ones.</p>
      </TitleWrapper>
      <InputEl>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={credentials.email}
          onChange={onChangeCredentials}
          autoComplete="true"
        />
      </InputEl>
      <InputEl>
        <input
          type={passwordType}
          placeholder="password"
          name="password"
          value={credentials.password}
          onChange={onChangeCredentials}
        />
        <button
          type="button"
          onClick={() => {
            passwordType === "password"
              ? setPasswordType("text")
              : setPasswordType("password");
          }}
        >
          {passwordType === "password" ? <Eye /> : <EyeSlash />}
        </button>
      </InputEl>
      <ButtonXl type="submit" disabled={loading}>
        {loading ? <DotLoader /> : "Login"}
      </ButtonXl>
      <OptionsWrapper>
        <Link to="/auth/forgotpassword">Forgot your password?</Link>
        <p>
          New to We Connect? <Link to="/auth/signup">Create an Account!</Link>
        </p>
      </OptionsWrapper>
    </FormContainer>
  );
}

export default SignIn;
