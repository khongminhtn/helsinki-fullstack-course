"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// This is type script style of import
// Its types will work
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const diagnoses_1 = __importDefault(require("./routes/diagnoses"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Parse json project into js object for access in req.body
app.use((0, cors_1.default)());
// Routes
app.use('/api/diagnoses', diagnoses_1.default);
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
