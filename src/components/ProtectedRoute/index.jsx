import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading, useAuthActions } from "../../hooks";
import { onAuthStateChanged, auth, getUserProfileData } from "../../services";
import { ErrorPage } from "../../pages";
import { MainPageLoader } from "../../utils/loaders/PageLoader";

function ProtectedRoute({ children, chatLoading = false }) {
  const { loading, stopLoading } = useLoading(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser, removeUser } = useAuthActions();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const userDocInfo = await getUserProfileData(user.uid);
          setUser(userDocInfo);
        } else {
          removeUser();
          navigate("/auth/signin");
        }
      } catch (error) {
        console.error("Error getting user: ", error);
        setError("An error occurred while loading. Please try again.");
      } finally {
        stopLoading();
      }
    });

    return () => unsubscribe();
  }, []);

  //   if (loading) return <PageLoader chatLoader={chatLoading} />;
  if (loading) return <MainPageLoader />;

  if (error) return <ErrorPage message={error} />;

  return children;
}

export default ProtectedRoute;
