import { useSearchParams } from "react-router-dom";

function useCustomParams() {
  const [searchParams] = useSearchParams();

  const connectedUserId = searchParams.get("c_u_id");
  const chatId = searchParams.get("c_id");

  return { chatId, connectedUserId };
}

export default useCustomParams;
