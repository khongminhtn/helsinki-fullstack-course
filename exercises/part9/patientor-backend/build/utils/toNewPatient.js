"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import Types
const types_1 = require("../types"); // To use main solution import ParserField
// Type Validation
const isString = (param) => {
    return typeof param === 'string' || param instanceof String;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.Gender).includes(param);
};
const isDate = (param) => {
    return Boolean(Date.parse(param));
};
// Parsers
const parseName = (param) => {
    if (!param || !isString(param)) {
        throw new Error('Incorrect or missing name: ' + param);
    }
    return param;
};
const parseDOB = (param) => {
    if (!param || !isString(param) || !isDate(param)) {
        throw new Error('Incorrect or missing date: ' + param);
    }
    return param;
};
const parseSsn = (param) => {
    if (!param || !isString(param)) {
        throw new Error('Incorrect or missing SSN: ' + param);
    }
    return param;
};
const parseGender = (param) => {
    if (!param || !isString(param) || !isGender(param)) {
        throw new Error('Incorrect or missing gender: ' + param);
    }
    return param;
};
const parseOccupation = (param) => {
    if (!param || !isString(param)) {
        throw new Error('Incorrect or missing SSN' + param);
    }
    return param;
};
// // Main function
// const toNewPatient = ({name, dateOfBirth, ssn, gender, occupation}: ParserField): NewPatient => {
//   const newEntry: NewPatient = {
//     name: parseName(name),
//     dateOfBirth: parseDOB(dateOfBirth),
//     ssn: parseSsn(ssn),
//     gender: parseGender(gender),
//     occupation: parseOccupation(occupation)
//   };
//   return newEntry;
// };
// Alternative solution
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (entry) => {
    const newEntry = {
        name: parseName(entry.name),
        dateOfBirth: parseDOB(entry.dateOfBirth),
        ssn: parseSsn(entry.ssn),
        gender: parseGender(entry.gender),
        occupation: parseOccupation(entry.occupation),
        entries: []
    };
    return newEntry;
};
exports.default = toNewPatient;
