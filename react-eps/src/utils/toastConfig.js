import { toast } from "react-hot-toast";

export const successToast = (message) =>
  toast.success(message, {
    position: "bottom-right",
    style: { background: "#0d6efd", color: "#fff" },
  });

export const errorToast = (message) =>
  toast.error(`Error: ${message}`, {
    position: "bottom-right",
    style: { background: "#dc3545", color: "#fff" },
  });
