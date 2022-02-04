import React, { createContext, useContext, useReducer } from "react";
import { Patient, Diagnosis } from "../types";

import { Action } from "./reducer";

// Defined a type for state
export type State = {
  patients: { [id: string]: Patient };
  patientVisited: Patient[];
  diagnosis: Diagnosis[]
};

// State when starting up
const initialState: State = {
  patients: {},
  patientVisited: [],
  diagnosis: []
};

// Create the first state and its dispatch
export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

// Defined a type for props for StateProvider
type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

// StateProvider give all component access to states and dispatcher
// It is a component that wraps <App/> which is the highest order component
// Located in index.ts
export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

// This is a hook used by all components to access the state
export const useStateValue = () => useContext(StateContext);
