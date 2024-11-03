import { useState } from "react";

function useFormValidation(initialValues, showError) {
  const [credentials, setCredentials] = useState(initialValues);

  const onChangeCredentials = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (credentials.hasOwnProperty("name")) {
      if (!credentials.name) {
        showError("Please enter full name");
        return false;
      }
    }

    if (!credentials.email) {
      showError("Please enter your email address");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      showError("Please enter a valid email address");
      return false;
    }

    if (!credentials.password) {
      showError("Please enter a password");
      return false;
    } else if (credentials.password.length < 6) {
      showError("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  return [onChangeCredentials, credentials, setCredentials, validate];
}

export default useFormValidation;
