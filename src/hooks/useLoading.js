import { useState } from "react";

function useLoading(initialLoading = false) {
  const [loading, setLoading] = useState(initialLoading);

  const startLoading = () => setLoading(true);

  const stopLoading = () => setLoading(false);

  return [loading, startLoading, stopLoading];
}

export default useLoading;
