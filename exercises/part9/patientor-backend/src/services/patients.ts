// Import data
// Remember that TypeScript will resolve the following extensions order
// ["js", "json", "node", "ts", "tsx"]
import patientsData from '../data/patients';

import {v1 as uuid} from 'uuid';

// Import types
import { NewPatient, PublicPatient, Patients, Entry, NewEntry } from '../types';

// Typer Assertion, incase of unwated inferences
// Forcing type NonSsnPatients to patientData to replace infer
const publicPatient: PublicPatient[] = patientsData as PublicPatient[];
let patients: Patients[] = patientsData ;
 
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

const addEntryToPatient = (patientId: string, entry: NewEntry): Entry => {
  // Entry Value must have id omited
  const id = uuid();
  const newEntry = {
    id,
    ...entry
  };

  patients = patients.map(patient => {
    if (patient.id === patientId) {
      patient.entries.push(newEntry);
      return patient;
    } else {
      return patient;
    }
  });

  console.log('addEntryToPatient|newEntry: ', newEntry);
  console.log('addEntryToPatient|patients: ', patients);
  return newEntry;
};

// Exporting business logics for routing
export default {
  getPatients,
  addPatients,
  getOnePatient,
  addEntryToPatient
};

