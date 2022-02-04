import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Entry, Patient } from '../types';
import { useStateValue } from '../state';

import { apiBaseUrl } from '../constants';

import { addVisited } from '../state/reducer';

// Exhaustive function that catches any unexpected types
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

// Individual components
const HealthCheck: React.FC<{entry: Entry}> = ({ entry }): JSX.Element => {
  return (
    <div key={entry.id}>
      <div>{entry.date} {entry.description}</div>
    </div>
  );
};

const Hospital: React.FC<{ entry: Entry}> = ({ entry }): JSX.Element => {
  return (
    <div key={entry.id}>
      <div>{entry.date} {entry.description}</div>
    </div>
  );
};

const OccupationalHealthCare: React.FC<{ entry: Entry}> = ({ entry }): JSX.Element => {
  return (
    <div key={entry.id}>
      <div>{entry.date} {entry.description}</div>
      {/* <ul>
        {
          entry
            .diagnosisCodes?.map(code => 
              <li key={code}>
                {code} {diagnosis.find(diagnose => diagnose.code === code)?.name}
              </li>
            )
        }
      </ul> */}
    </div>
  );
};

// Defining a component with type REACT FUNCTION COMPONENT
// Which takes in a param called "entry" of type Entry
const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheck entry={entry}/>;
    case "Hospital":
      return <Hospital entry={entry}/>;
    case "OccupationalHealthcare":
      return <OccupationalHealthCare entry={entry}/>;
    default:
      return assertNever(entry);
  }
};

const PatientInfo = (): JSX.Element => {
  // Get state and dispatcher
  const [{patientVisited},dispatch] = useStateValue();

  // Get id from router params
  const { id } = useParams<{id: string}>();
  console.log('<PatientInfo>|id:', id);
  
  // Finding patient using patient ID against patientVisited
  const patientInState: Patient | undefined = Object
    .values(patientVisited)
    .find(patient => patient.id === id);

  // Fetch patient from API if patient does not exist in state
  const fetchPatient = async () => {
    try {
      const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch(addVisited(patient));
      console.log('<PatientInfo>|fetchPatient()|dispatched', patient);
    } catch(e) {
      console.error(e);
    }
  };

  // Catching undefined results and return appropriate info
  if (!patientInState) {
    void fetchPatient();
    return <div>Fetching data...</div>;
  } else {
    return (
      <>
        <h3>{patientInState.name}</h3>
        <div>venus</div>
        <div>dob: {patientInState.dateOfBirth}</div>
        <div>gender: {patientInState.gender}</div>
        <div>occupation: {patientInState.occupation}</div>

        <h2>Entries</h2>
        <div>
          {
            patientInState.entries.map(entry => <EntryDetails key={entry.id} entry={entry}/>)
          }
        </div>

      </>
    );
  }

};

export default PatientInfo;