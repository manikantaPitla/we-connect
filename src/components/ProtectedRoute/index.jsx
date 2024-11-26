import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading, useAuthActions } from "../../hooks";
import { onAuthStateChanged, auth, getUserData } from "../../services";
import { ErrorPage } from "../../pages";
import { PageLoader } from "../../utils";

function ProtectedRoute({ children, chatLoading = false }) {
  const { loading, startLoading, stopLoading } = useLoading(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser, removeUser } = useAuthActions();

  useEffect(() => {
    startLoading();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const userDocInfo = await getUserData(user.uid);
          setUser(userDocInfo);
        } else {
          removeUser();
          navigate("/auth/signin");
        }
      } catch (error) {
        console.error("Error loading...", error);
        setError("An error occurred while loading. Please try again.");
      } finally {
        stopLoading();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  if (loading) {
    return <PageLoader chatLoader={chatLoading} />;
  }

  if (error) {
    return <ErrorPage message={error} />;
  }

  return children;
}

export default ProtectedRoute;
