"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import data
// Remember that TypeScript will resolve the following extensions order
// ["js", "json", "node", "ts", "tsx"]
const diagnoses_json_1 = __importDefault(require("../data/diagnoses.json"));
// Making sure that diagnosesData adheres to type Diagnoses
const diagnoses = diagnoses_json_1.default;
// Business logic
const getDiagnoses = () => {
    return diagnoses;
};
// Exporting business logics for routing
exports.default = {
    getDiagnoses
};
