import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading, useAuthActions } from "../../hooks";
import { PageLoader } from "../Loader";
import { extractUserInfo, onAuthStateChanged, auth } from "../../services";

function ProtectedRoute({ children }) {
  const [loading, startLoading, stopLoading] = useLoading(true);
  const navigate = useNavigate();

  const { setUser, removeUser } = useAuthActions();

  useEffect(() => {
    startLoading();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setTimeout(() => {
        stopLoading();
        if (user) {
          const userInfo = extractUserInfo(user);
          setUser(userInfo);
        } else {
          removeUser();
          navigate("/auth/signin");
        }
      }, 2000);
    });

    return () => {
      unsubscribe();
      stopLoading();
    };
  }, [navigate]);

  if (loading) {
    return <PageLoader />;
  }

  return children;
}

export default ProtectedRoute;
