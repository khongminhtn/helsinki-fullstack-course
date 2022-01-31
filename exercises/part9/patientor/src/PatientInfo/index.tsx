import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Patient } from '../types';
import { useStateValue } from '../state';

import { apiBaseUrl } from '../constants';

import { addVisited } from '../state/reducer';

const PatientInfo = (): JSX.Element => {
  // Get state and dispatcher
  const [{patientVisited},dispatch] = useStateValue();

  // Get id from router params
  const { id } = useParams<{id: string}>();
  console.log('<PatientInfo>|id:', id);
  
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
    </>
    );
  }

};

export default PatientInfo;