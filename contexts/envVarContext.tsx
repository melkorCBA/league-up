import { useContext, createContext, useState } from "react";

export const ClientEnvContext = createContext(null);

export const ClientEnvProvider = (props) => {
  const [clientenvs, setClientenvs] = useState({});
  return (
    <ClientEnvContext.Provider value={{ clientenvs, setClientenvs }}>
      {props.children}
    </ClientEnvContext.Provider>
  );
};

export const useClientenvs = () => {
  const context = useContext(ClientEnvContext);
  return context;
};
