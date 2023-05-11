import { useEffect } from "react";
import toast from "react-hot-toast";

interface Props {
  error: boolean;
}

function useShowError({ error }: Props) {
  const errorToast = () => {
    toast.error(
      "Sorry, an error occurred while loading this track. Please try again later.",
      { duration: 6000 }
    );
  };

  useEffect(() => {
    if (error) {
      errorToast();
    }
  }, [error]);
}

export default useShowError;
