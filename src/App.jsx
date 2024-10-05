import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute, AuthLayout } from "./components";
import { Home, SignIn, SignUp, ForgotPassword, PageNotFound } from "./pages";

function App() {
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
    </BrowserRouter>
  );
}

export default App;
