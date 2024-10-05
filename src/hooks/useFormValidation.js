import { useState } from "react";

function useFormValidation(initialValues) {
  const [credentials, setCredentials] = useState(initialValues);
  const [validationError, setValidationError] = useState("");

  const onChangeCredentials = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    setValidationError("");

    if (credentials.hasOwnProperty("name")) {
      if (!credentials.name) {
        setValidationError("Please enter full name.");
        return false;
      }
    }

    if (!credentials.email) {
      setValidationError("Please enter your email address.");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      setValidationError("Please enter a valid email address.");
      return false;
    }

    if (!credentials.password) {
      setValidationError("Please enter a password.");
      return false;
    } else if (credentials.password.length < 6) {
      setValidationError("Password must be at least 6 characters.");
      return false;
    }

    setValidationError("");

    return true;
  };

  return [onChangeCredentials, credentials, validate, validationError];
}

export default useFormValidation;
