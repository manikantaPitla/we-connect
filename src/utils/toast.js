import { toast } from "react-toastify";

const toastSettings = {
  position: "top-right",
  autoClose: 2500,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const showError = (message) => {
  return toast.error(message, { ...toastSettings });
};
export const showSuccess = (message) => {
  return toast.success(message, { ...toastSettings });
};
