"use strict";
// src/controllers/booksController.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooks = exports.createBook = void 0;
const Books_1 = require("../Models/Books");
const createBook = async (req, res) => {
    const { title, author } = req.body;
    try {
        const newBook = new Books_1.BookModel({
            title,
            author,
            createdAt: new Date(),
            // createdBy: req.user.username,
        });
        await newBook.save();
        res.status(201).json({ message: 'Book created successfully', newBook });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: error.msg });
    }
};
exports.createBook = createBook;
const getBooks = (req, res) => {
    const { old, new: isNew } = req.query;
    const query = {};
    // console.log(req.userRoles)
    if (old === '1') {
        query.createdAt = { $lte: new Date(Date.now() - 10 * 60 * 1000) };
    }
    else if (isNew === '1') {
        query.createdAt = { $gt: new Date(Date.now() - 10 * 60 * 1000) };
    }
    // const userRoles = req.user?.roles ?? [];
    const userRoles = [""];
    if (userRoles.includes('VIEW_ALL')) {
        Books_1.BookModel.find(query, (err, books) => {
            if (err) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.status(200).json({ books });
        });
    }
    else if (userRoles.includes('VIEWER')) {
        //   query.createdBy = req.user?.username;
        Books_1.BookModel.find(query, (err, books) => {
            if (err) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.status(200).json({ books });
        });
    }
    else {
        return res.status(403).json({ message: 'Forbidden' });
    }
};
exports.getBooks = getBooks;
