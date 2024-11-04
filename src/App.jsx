import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute, AuthLayout } from "./components";
import {
  Home,
  SignIn,
  SignUp,
  ForgotPassword,
  PageNotFound,
  //   ErrorPage,
} from "./pages";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
  const pageTheme = useSelector((state) => state.theme);
  console.log("App Component");

  useEffect(() => {
    const theme = pageTheme?.isDarkModeOn ? "dark" : "light";
    document.body.classList.remove(pageTheme.isDarkModeOn ? "light" : "dark");
    document.body.classList.add(theme);
  }, [pageTheme.isDarkModeOn]);

  return (
    <BrowserRouter>
      <SkeletonTheme
        baseColor={
          pageTheme.isDarkModeOn ? "var(--secondary-text-color)" : "#ebebeb"
        }
        highlightColor={pageTheme.isDarkModeOn ? "#444" : "#f5f5f5"}
      >
        <Routes>
          <Route
            path="/"
            element={
              // <ProtectedRoute>
              <Home />
              // </ProtectedRoute>
            }
          />
          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<SignIn />} />
            <Route index path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
          {/* <Route path="page-error" element={<ErrorPage />} /> */}
        </Routes>
        <ToastContainer limit={0} />
        <div id="popup-root"></div>
      </SkeletonTheme>
    </BrowserRouter>
  );
}

export default App;
