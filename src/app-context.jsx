import React, { createContext, useContext, useReducer } from "react";
import appInitialState from "./reducers/app-reducer";

import { appReducer } from "./reducers/app-reducer";

const AppStateContext = createContext();
const AppDispatchContext = createContext();

const AppContext = ({ children }) => {
  const [appState, appDispatch] = useReducer(appReducer, appInitialState);

  return (
    <AppStateContext.Provider value={appState}>
      <AppDispatchContext.Provider value={appDispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

function useAppStateContext() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppStateContext must be used within a CountProvider");
  }
  return context;
}

function useAppDispatchContexth() {
  const context = useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useAppDispatchContexth must be used within a CountProvider"
    );
  }
  return context;
}

export { useAppStateContext, useAppDispatchContexth };
export default AppContext;
