// Import Types
import { NewPatient, Gender } from "../types"; // To use main solution import ParserField


// Type Validation
const isString = (param: unknown): param is string => {
  return typeof param === 'string' || param instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const isDate = (param: string): boolean => {
  return Boolean(Date.parse(param));
};

// Parsers
const parseName = (param: unknown): string => {
  if (!param || !isString(param)) {
    throw new Error('Incorrect or missing name: ' + param);
  }
  return param;
};

const parseDOB = (param: unknown): string => {
  if (!param || !isString(param) || !isDate(param)) {
    throw new Error('Incorrect or missing date: ' + param);
  }
  return param;
};

const parseSsn = (param: unknown): string => {
  if (!param || !isString(param)) {
    throw new Error('Incorrect or missing SSN: ' + param);
  }
  return param;
};

const parseGender = (param: unknown): Gender => {
  if (!param || !isString(param) || !isGender(param)) {
    throw new Error('Incorrect or missing gender: ' + param);
  }
  return param;
};

const parseOccupation = (param: unknown): string =>  {
  if (!param || !isString(param)) {
    throw new Error('Incorrect or missing SSN' + param);
  }
  return param;
};

// // Main function
// const toNewPatient = ({name, dateOfBirth, ssn, gender, occupation}: ParserField): NewPatient => {
//   const newEntry: NewPatient = {
//     name: parseName(name),
//     dateOfBirth: parseDOB(dateOfBirth),
//     ssn: parseSsn(ssn),
//     gender: parseGender(gender),
//     occupation: parseOccupation(occupation)
//   };

//   return newEntry;
// };

// Alternative solution
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (entry: any): NewPatient => {
  const newEntry: NewPatient = {
    name: parseName(entry.name),
    dateOfBirth: parseDOB(entry.dateOfBirth),
    ssn: parseSsn(entry.ssn),
    gender: parseGender(entry.gender),
    occupation: parseOccupation(entry.occupation),
    entries: []
  };

  return newEntry;
};


export default toNewPatient;