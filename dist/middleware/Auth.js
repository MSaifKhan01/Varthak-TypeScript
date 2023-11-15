"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const auth = (requiredRoles) => {
    return async (req, res, next) => {
        const token = req.headers.authorization;
        if (token) {
            try {
                const decoded = await jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "");
                if (decoded) {
                    req.user = decoded;
                    req.userRoles = decoded.roles || [];
                    const hasRequiredRole = req.userRoles.some((role) => requiredRoles.includes(role));
                    if (!hasRequiredRole) {
                        return res.status(403).json({ message: 'Insufficient permissions' });
                    }
                    next();
                }
                else {
                    return res.status(401).send({ "msg": "Login again" });
                }
            }
            catch (error) {
                return res.status(401).send({ "msg": "Invalid token" });
            }
        }
        else {
            return res.status(404).send({ msg: "Login first" });
        }
    };
};
exports.auth = auth;
