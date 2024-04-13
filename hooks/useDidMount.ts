import { useRef, useEffect } from "react";

export default function useDidMount() {
  const mountRef = useRef(false);

  useEffect(() => {
    mountRef.current = true;
  }, []);

  return () => mountRef.current;
}
