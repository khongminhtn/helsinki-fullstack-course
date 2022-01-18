// Import data
// Remember that TypeScript will resolve the following extensions order
// ["js", "json", "node", "ts", "tsx"]
import patientsData from '../data/patients.json';

import {v1 as uuid} from 'uuid';
const id = uuid();

// Import types
import { NewPatient, NonSsnPatients } from '../types';

// Typer Assertion, incase of unwated inferences
// Forcing type NonSsnPatients to patientData to replace infer
const nonSsnPatients: NonSsnPatients[] = patientsData as NonSsnPatients[];
 
// Business logic
const getPatients = (): NonSsnPatients[] => {
  return nonSsnPatients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatients = (entry: NewPatient): NonSsnPatients => {
  const newPatient = {
    id: id,
    ...entry
  };

  patientsData.push(newPatient);
  return newPatient;
};

// Exporting business logics for routing
export default {
  getPatients,
  addPatients,
};

