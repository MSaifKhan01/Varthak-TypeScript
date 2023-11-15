"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
const BookRouters_1 = __importDefault(require("./Routes/BookRouters"));
const db_1 = require("./Config/db");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
dotenv_1.default.config();
app.get("/well", (req, res) => {
    res.send({ "msg": "hello" });
});
app.use("/user", userRoutes_1.default);
app.use("/", BookRouters_1.default);
app.listen(process.env.port, async () => {
    try {
        await db_1.connecting;
        console.log("connected");
    }
    catch (error) {
        console.log(error);
    }
    console.log("connected to server");
});
