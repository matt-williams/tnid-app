import React, { createContext, useEffect, useState } from 'react';

interface AppState {
  phoneNumber: string;
  token: string;
}

interface AppContextProps {
  appState: AppState;
  setPhoneNumber: (string) => void;
  setToken: (string) => void;
}

export const AppContext = createContext<AppContextProps | null>(null);

const AppProvider: React.FC = ({ children }) => {
  const [appState, setAppState] = useState<AppState>({phoneNumber: "", token: null});

  useEffect(() => {
    const storedState = sessionStorage.getItem('appState');
    if (storedState) {
      setAppState(JSON.parse(storedState));
    }
  }, []);
  useEffect(() => {
    sessionStorage.setItem('appState', JSON.stringify(appState));
  }, [appState]);

  const setPhoneNumber = (phoneNumber) => {
    setAppState((prevState) => ({
      phoneNumber: phoneNumber,
      token: null
    }));
  };
  const setToken = (token) => {
    setAppState((prevState) => ({
      ...prevState,
      token: token
    }));
  };

  return (
    <AppContext.Provider value={{appState, setPhoneNumber, setToken}}>
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
