"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const user_1 = require("../Models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const auth = async (req, res, next) => {
    const token = req.headers?.authorization;
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '', async (err, decoded) => {
            if (err) {
                console.log(err);
                return res.status(401).send({ msg: "Please log in again", err: err.message });
            }
            try {
                const user = await user_1.UserModel.findById(decoded.user_id);
                if (!user) {
                    return res.status(401).send({ msg: "User not found" });
                }
                req.body.user = user;
                req.body.x_userRole = user.roles;
                next();
            }
            catch (err) {
                console.log(err);
                res.status(500).send("Internal Server Error");
            }
        });
    }
    else {
        res.status(401).send("Unauthorized: Please log in");
    }
};
exports.auth = auth;
