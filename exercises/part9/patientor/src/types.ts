export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

// Entries types
interface EntryBase {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
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
  | HealthCheckEntry;

export type NewEntry = 
  | Omit<HospitalEntry, "id">
  | Omit<OccupationalHealthcareEntry, "id">
  | Omit<HealthCheckEntry, "id">;


export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]
}
