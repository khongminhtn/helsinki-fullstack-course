// routers are middlewares that will be passed as param 
// to app.use('main/url', routes) in index.ts
import express from 'express';

// Import TS Types resolved business logic
import patientsService from '../services/patients';

import { Entry, NewPatient } from '../types';

// Import Utils, resolve external data
import toNewPatient from '../utils/toNewPatient';

// Create a Router object
const router = express.Router();

// Adding a GET HTTP operation to Router Object
router.get('/', (_req, res) => {
  res.send(JSON.stringify(patientsService.getPatients()));
});

// Add POST to add patients
router.post('/', (req, res) => {
  try {
    // Cleaning external data
    const newPatientEntry: NewPatient = toNewPatient(req.body);
    // adding data to database
    const addedEntry = patientsService.addPatients(newPatientEntry);
    res.json(addedEntry);
  } catch(error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error ' + error.message;
    }
    res.status(400).send(errorMessage);
  }

});

// Add an entry to a specific patient identified using their id
router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newEntry: Entry = req.body;
  try {
    const addedEntry = patientsService.addEntryToPatient(id, newEntry);
    res.json(addedEntry);
  } catch(error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += ' Error ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

// Returns all info of a patient
router.get('/:id', (req, res) => {
  res.send(patientsService.getOnePatient(req.params.id));
});

// Export Router object to use in index.ts
export default router;