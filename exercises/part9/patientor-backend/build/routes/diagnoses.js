"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routers are middlewares that will be passed as param 
// to app.use('main/url', routes) in index.ts
const express_1 = __importDefault(require("express"));
// Import TS Types resolved business logic
const diagnoses_1 = __importDefault(require("../services/diagnoses"));
// Create a Router object
const router = express_1.default.Router();
// Adding a GET HTTP operation to Router Object
router.get('/', (_req, res) => {
    res.send(diagnoses_1.default.getDiagnoses());
});
// Export Router object to use in index.ts
exports.default = router;
