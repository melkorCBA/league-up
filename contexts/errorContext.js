import { useContext, createContext, useState } from "react";

export const ErrorContext = createContext(null);

export const ErrorProvider = (props) => {
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");
  return (
    <ErrorContext.Provider value={{ errors, setErrors, success, setSuccess }}>
      {props.children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  return context;
};
