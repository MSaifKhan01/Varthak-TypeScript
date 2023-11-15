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
    const user = await user_1.UserModel.findOne({ username });
    if (user?.username) {
        res.send("User already present");
    }
    else {
        try {
            bcrypt_1.default.hash(password, 4, async (err, hash) => {
                if (hash) {
                    const user = new user_1.UserModel({ username, password: hash, roles });
                    await user.save();
                    res.send("Registration succesfull");
                }
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await user_1.UserModel.findOne({ username });
    console.log(user);
    if (user?.username) {
        bcrypt_1.default.compare(password, user.password, (err, result) => {
            if (result) {
                const token = jsonwebtoken_1.default.sign({ user_id: user._id, role: user.roles }, process.env.JWT_SECRET || '', { expiresIn: "1h" });
                // res.cookie("token", token, { httpOnly: true });
                res.send({ msg: "Logged in succesfull", token });
            }
            else {
                res.send("Invalid credentials");
            }
        });
    }
    else {
        res.send("Invalid credentials");
    }
};
exports.loginUser = loginUser;
