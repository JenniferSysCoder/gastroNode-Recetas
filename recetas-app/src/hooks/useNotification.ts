import { toast } from "react-toastify";

export function useNotification() {
  const notify = (message: string) => {
    toast(message, {
      position: "top-right",
      autoClose: 2500,
      pauseOnHover: true,
      hideProgressBar: false,
      closeOnClick: true,
      className: "text-dark", 
      style: {
        backgroundColor: "#d3c6b2", 
      },
      progressClassName: "bg-success", 
    });
  };

  return { notify };
}
