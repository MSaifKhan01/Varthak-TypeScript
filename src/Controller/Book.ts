
import { Request, Response } from 'express';
import { BookModel } from '../Models/Books';




// Create a book

 
  export const createBook= async (req: Request, res: Response) => {
    const { title, author } = req.body;
    const createdBy = req.body.user._id;
    const book = new BookModel({ title, author, createdBy });
    try {
      await book.save();
      res.send({ msg: "Book added successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "Internal Server Error" });
    }
  }


// Get books

 

 
  export const getBooks= async (req: Request, res: Response) => {
    const { x_userRole } = req.body;
    const { old, new: newBooks } = req.query;
    const query: any = {};

    if (old === "1") {
      query.createdAt = { $lte: new Date(Date.now() - 10 * 60 * 1000) };
    } else if (newBooks === "1") {
      query.createdAt = { $gt: new Date(Date.now() - 10 * 60 * 1000) };
    }

    try {
      if (x_userRole.includes("VIEW_ALL")) {
        const books = await BookModel.find(query);
        res.send(books);
      } else if (x_userRole.includes("VIEWER")) {
        const createdBy = req.body.user._id;
        const books = await BookModel.find({ createdBy, ...query });
        res.send(books);
      } else {
        res.send("You are not authorized to view books");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  }

