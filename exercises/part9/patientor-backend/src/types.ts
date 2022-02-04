// Diagnoses Types
export interface Diagnoses {
  code: string,
  name: string,
  latin?: string  // May or may not be available, use optional property '?'
}

// Entries types
interface EntryBase {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnoses['code']>;
}

// Hospital Entries
interface HostpitalDischarge {
  date: string;
  criteria: string;
}

interface HospitalEntry extends EntryBase {
  type: 'Hospital';
  discharge: HostpitalDischarge;
}

// OccupationalHealthCareEntry
interface HealthCareSickLeave {
  startDate: string;
  endDate: string;
}
interface OccupationalHealthcareEntry extends EntryBase {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: HealthCareSickLeave;
}

// HealthCheck
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}
interface HealthCheckEntry extends EntryBase{
  type: "HealthCheck"
  healthCheckRating: HealthCheckRating
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type Entry = 
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry

// Patient Types
export enum Gender { 
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Patients {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[]
}

export type ParserField = { 
  name: unknown, 
  dateOfBirth: unknown, 
  ssn: unknown, 
  gender: unknown, 
  occupation: unknown 
};

// Utility Types: Takes in Patients, excludeds 'ssn' field 
// and make new type 'NonSsnPatients' 
// Omitted field will be of type any and it becomes optional
export type PublicPatient = Omit<Patients, 'ssn' | 'entries'>;

// Patients without ID
export type NewPatient = Omit<Patients, 'id'>;