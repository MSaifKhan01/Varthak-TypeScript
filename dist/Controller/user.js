"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../Models/user");
const registerUser = async (req, res) => {
    const { username, password, roles } = req.body;
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = new user_1.UserModel({
            username,
            password: hashedPassword,
            roles: roles || [],
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await user_1.UserModel.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const passwordMatch = await bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const token = jsonwebtoken_1.default.sign({ username, roles: user.roles }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
        res.status(200).json({ token, roles: user.roles });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.loginUser = loginUser;
