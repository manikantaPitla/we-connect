import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeSlash } from "../../assets/icons";
import {
  ButtonXl,
  InputEl,
  TitleWrapper,
  OptionsWrapper,
  FormWrapper,
} from "../../styles/commonStyles";
import { DotLoader } from "../../components";
import { useLoading, useFormValidation } from "../../hooks";
import { showError, signUpWithEmail } from "../../services";

function SignUp() {
  const [passwordType, setPasswordType] = useState("password");

  const { loading, startLoading, stopLoading } = useLoading();
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const [onChangeCredentials, credentials, setCredentials, validate] =
    useFormValidation(initialValues, showError);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = credentials;

    if (validate()) {
      startLoading();

      try {
        await signUpWithEmail(name, email, password);
        setCredentials(initialValues);
        navigate("/");
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            showError("Email already exists");
            break;
          case "auth/network-request-failed":
            showError("Check your network connection");
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
    <FormWrapper onSubmit={handleSubmit}>
      <TitleWrapper>
        <h1>Welcome,</h1>
        <p>Create your account to get started.</p>
      </TitleWrapper>
      <InputEl>
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={credentials.name}
          onChange={onChangeCredentials}
        />
      </InputEl>
      <InputEl>
        <input
          type="text"
          placeholder="Email Address"
          name="email"
          value={credentials.email}
          onChange={onChangeCredentials}
          autoComplete="true"
        />
      </InputEl>
      <InputEl>
        <input
          type={passwordType}
          placeholder="Password"
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
        {loading ? <DotLoader /> : "Create Account"}
      </ButtonXl>
      <OptionsWrapper>
        <p>
          Already have an account? <Link to="/auth/signin">Sign In</Link>
        </p>
      </OptionsWrapper>
    </FormWrapper>
  );
}

export default SignUp;
