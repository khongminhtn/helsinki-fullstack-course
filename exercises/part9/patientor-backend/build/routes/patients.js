"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routers are middlewares that will be passed as param 
// to app.use('main/url', routes) in index.ts
const express_1 = __importDefault(require("express"));
// Import TS Types resolved business logic
const patients_1 = __importDefault(require("../services/patients"));
// Import Utils, resolve external data
const toNewPatient_1 = __importDefault(require("../utils/toNewPatient"));
// Create a Router object
const router = express_1.default.Router();
// Adding a GET HTTP operation to Router Object
router.get('/', (_req, res) => {
    res.send(JSON.stringify(patients_1.default.getPatients()));
});
// Add POST to add patients
router.post('/', (req, res) => {
    try {
        const newPatientEntry = (0, toNewPatient_1.default)(req.body);
        const addedEntry = patients_1.default.addPatients(newPatientEntry);
        console.log(addedEntry);
        res.json(addedEntry);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
// Returns all info of a patient
router.get('/:id', (req, res) => {
    const patient = patients_1.default.getOnePatient(req.params.id);
    console.log(JSON.stringify(patient));
    res.send(JSON.parse(JSON.stringify(patient)));
});
// Export Router object to use in index.ts
exports.default = router;
