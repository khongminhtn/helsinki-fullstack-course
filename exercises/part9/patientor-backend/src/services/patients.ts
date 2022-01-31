// Import data
// Remember that TypeScript will resolve the following extensions order
// ["js", "json", "node", "ts", "tsx"]
import patientsData from '../data/patients';

import {v1 as uuid} from 'uuid';

// Import types
import { NewPatient, PublicPatient, Patients } from '../types';

// Typer Assertion, incase of unwated inferences
// Forcing type NonSsnPatients to patientData to replace infer
const publicPatient: PublicPatient[] = patientsData as PublicPatient[];
const patients: Patients[] = patientsData as Patients[];
 
// Business logic
const getPatients = (): PublicPatient[] => {
  return publicPatient.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatients = (entry: NewPatient): Patients => {
  const id = uuid();
  const newPatient = {
    id: id,
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

const getOnePatient = (id: string): Patients | undefined => {
  const patient = patients.find(patient => id === patient.id);
  return patient;
};

// Exporting business logics for routing
export default {
  getPatients,
  addPatients,
  getOnePatient
};

