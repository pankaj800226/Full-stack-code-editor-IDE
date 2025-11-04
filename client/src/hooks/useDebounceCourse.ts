import { useEffect, useState } from "react";

export const useDebounce = <T,>(value: T, delay = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // ✅ use clearTimeout instead of clearInterval
    return () => clearTimeout(handle);
  }, [value, delay]);

  return debouncedValue;
};
