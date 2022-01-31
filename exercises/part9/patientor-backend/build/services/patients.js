"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import data
// Remember that TypeScript will resolve the following extensions order
// ["js", "json", "node", "ts", "tsx"]
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
// Typer Assertion, incase of unwated inferences
// Forcing type NonSsnPatients to patientData to replace infer
const publicPatient = patients_1.default;
const patients = patients_1.default;
// Business logic
const getPatients = () => {
    return publicPatient.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const addPatients = (entry) => {
    const id = (0, uuid_1.v1)();
    const newPatient = Object.assign({ id: id }, entry);
    patients.push(newPatient);
    return newPatient;
};
const getOnePatient = (id) => {
    const patient = patients.find(patient => id === patient.id);
    return patient;
};
// Exporting business logics for routing
exports.default = {
    getPatients,
    addPatients,
    getOnePatient
};
