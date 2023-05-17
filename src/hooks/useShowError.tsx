import { useEffect } from "react";
import toast from "react-hot-toast";

interface Props {
  error: boolean;
  message: string;
}

function useShowError({ error, message }: Props) {
  const errorToast = () => {
    toast.error(message, { duration: 6000, id: `id of ${message}` });
  };

  useEffect(() => {
    if (error) {
      errorToast();
    }
  }, [error]);
}

export default useShowError;
