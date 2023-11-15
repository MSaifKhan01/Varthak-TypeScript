"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooks = exports.createBook = void 0;
const Books_1 = require("../Models/Books");
// Create a book
const createBook = async (req, res) => {
    const { title, author } = req.body;
    const createdBy = req.body.user._id;
    const book = new Books_1.BookModel({ title, author, createdBy });
    try {
        await book.save();
        res.send({ msg: "Book added successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ msg: "Internal Server Error" });
    }
};
exports.createBook = createBook;
// Get books
const getBooks = async (req, res) => {
    const { x_userRole } = req.body;
    const { old, new: newBooks } = req.query;
    const query = {};
    if (old === "1") {
        query.createdAt = { $lte: new Date(Date.now() - 10 * 60 * 1000) };
    }
    else if (newBooks === "1") {
        query.createdAt = { $gt: new Date(Date.now() - 10 * 60 * 1000) };
    }
    try {
        if (x_userRole.includes("VIEW_ALL")) {
            const books = await Books_1.BookModel.find(query);
            res.send(books);
        }
        else if (x_userRole.includes("VIEWER")) {
            const createdBy = req.body.user._id;
            const books = await Books_1.BookModel.find({ createdBy, ...query });
            res.send(books);
        }
        else {
            res.send("You are not authorized to view books");
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};
exports.getBooks = getBooks;
