import { useEffect } from "react";
import { auth, onAuthStateChanged } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import useLoading from "../../hooks/useLoading";
import { PageLoader } from "../Loader";

function ProtectedRoute({ children }) {
  const [loading, startLoading, stopLoading] = useLoading();
  const navigate = useNavigate();

  useEffect(() => {
    startLoading();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setTimeout(() => {
        stopLoading();
        if (user) {
          console.log(user);
        } else {
          navigate("/auth/signin");
        }
      }, 3000);
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
