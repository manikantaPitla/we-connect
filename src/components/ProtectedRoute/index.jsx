import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading, useAuthActions } from "../../hooks";
import { PageLoader } from "../Loader";
import { onAuthStateChanged, auth, getUser } from "../../services";

function ProtectedRoute({ children }) {
  const [loading, startLoading, stopLoading] = useLoading(true);
  const navigate = useNavigate();

  const { setUser, removeUser } = useAuthActions();

  useEffect(() => {
    startLoading();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      //   setTimeout(() => {
      if (user) {
        (async function () {
          const userDocInfo = await getUser(user.uid);
          setUser(userDocInfo);
          stopLoading();
        })();
      } else {
        removeUser();
        navigate("/auth/signin");
      }
      //   }, 2000);
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
