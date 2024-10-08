import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute, AuthLayout } from "./components";
import { Home, SignIn, SignUp, ForgotPassword, PageNotFound } from "./pages";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const pageTheme = useSelector((state) => state.theme);

  useEffect(() => {
    const theme = pageTheme?.isDarkModeOn ? "dark" : "light";
    document.body.classList.remove(pageTheme.isDarkModeOn ? "light" : "dark");
    document.body.classList.add(theme);
  }, [pageTheme.isDarkModeOn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<SignIn />} />
          <Route index path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <div id="popup-root"></div>
    </BrowserRouter>
  );
}

export default App;
