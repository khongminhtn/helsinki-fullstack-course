import { State } from "./state";
import { Patient } from "../types";

// ACTION TYPES
export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_VISITED";
      payload: Patient;
  };

// ACTION CREATORS
export const setPatientList = (payload: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload
  };
};

export const addPatient = (payload: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload
  };
};

export const addVisited = (payload: Patient): Action => {
  return {
    type: 'ADD_VISITED',
    payload
  };
};
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_VISITED":
      return {
        ...state,
        patientVisited: [...state.patientVisited, action.payload]
      };
    default:
      return state;
  }
};
