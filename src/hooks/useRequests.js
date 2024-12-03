import { useDispatch } from "react-redux";
import { addRequests } from "../app/features/requestsReducer";

function useRequests() {
  const dispatch = useDispatch();

  const setRequests = (requests) => dispatch(addRequests(requests));

  return { setRequests };
}

export default useRequests;
