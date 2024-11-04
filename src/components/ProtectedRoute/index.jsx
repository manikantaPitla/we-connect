import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading, useAuthActions } from "../../hooks";
import { PageLoader } from "../Loader";
import { onAuthStateChanged, auth, getUser } from "../../services";
import { ErrorPage } from "../../pages";

function ProtectedRoute({ children }) {
  const [loading, startLoading, stopLoading] = useLoading(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser, removeUser } = useAuthActions();

  useEffect(() => {
    startLoading();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const userDocInfo = await getUser(user.uid);
          setUser(userDocInfo);
        } else {
          removeUser();
          navigate("/auth/signin");
        }
      } catch (err) {
        console.error("Error loading...", err);
        setError(
          "An error occurred while loading. Please try again."
        );
      } finally {
        stopLoading();
      }
    });

    return () => {
      unsubscribe();
      stopLoading();
    };
  }, [navigate]);

  if (loading) {
    return <PageLoader />;
  }

  if (error) {
    return <ErrorPage message={error} />;
  }

  return children;
}

export default ProtectedRoute;
