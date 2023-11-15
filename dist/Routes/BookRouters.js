"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Book_1 = require("../Controller/Book");
const Auth_1 = require("../middleware/Auth");
const BookRouter = express_1.default.Router();
BookRouter.post('/books', (0, Auth_1.auth)(['CREATOR']) || (0, Auth_1.auth)(['VIEW_ALL']), Book_1.createBook);
BookRouter.get('/books', (0, Auth_1.auth)(['VIEWER']), Book_1.getBooks);
exports.default = BookRouter;
