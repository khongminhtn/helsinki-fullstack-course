// Diagnoses Types
export interface Diagnoses {
  code: string,
  name: string,
  latin?: string  // May or may not be available, use optional property '?'
}


// Patient Types
export enum Gender { 
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
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