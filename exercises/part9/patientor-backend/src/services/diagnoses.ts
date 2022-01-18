// Import data
// Remember that TypeScript will resolve the following extensions order
// ["js", "json", "node", "ts", "tsx"]
import diagnosesData from '../data/diagnoses.json';

// Import types
import { Diagnoses } from '../types';

// Making sure that diagnosesData adheres to type Diagnoses
const diagnoses: Array<Diagnoses> = diagnosesData;

// Business logic
const getDiagnoses = (): Array<Diagnoses> => {
  return diagnoses;
};

// Exporting business logics for routing
export default {
  getDiagnoses
};