// routers are middlewares that will be passed as param 
// to app.use('main/url', routes) in index.ts
import express from 'express';

// Import TS Types resolved business logic
import diagnosesService from '../services/diagnoses';

// Create a Router object
const router = express.Router();

// Adding a GET HTTP operation to Router Object
router.get('/', (_req, res) => {
  res.send(diagnosesService.getDiagnoses());
});

// Export Router object to use in index.ts
export default router;