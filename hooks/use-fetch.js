import { useState, useCallback } from "react";
import { toast } from "sonner";

const useFetch = (cb) => {
  //cb -> callback
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const fn = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);

      try {
        const response = await cb(...args);
        setData(response);
        setError(null);
      } catch (error) {
        setError(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    },
    [cb],
  );

  return { data, setData, loading, error, fn };
};

export default useFetch;
