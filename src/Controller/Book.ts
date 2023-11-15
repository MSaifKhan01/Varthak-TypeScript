// src/controllers/booksController.ts

import { Request, Response } from 'express';
import { BookModel } from '../Models/Books';

export const createBook = async (req: Request, res: Response) => {
  const { title, author } = req.body;


try {
  
    const newBook = new BookModel({
        title,
        author,
        createdAt: new Date(),
        // createdBy: req.user.username,
      });
    
      await newBook.save()

    
        res.status(201).json({ message: 'Book created successfully', newBook });
  
} catch (error: any) {
    console.error(error)
    return res.status(500).json({ msg: error.msg })
}
};




export const getBooks = (req: Request, res: Response) => {
    const { old, new: isNew } = req.query;
    const query: any = {};
    // console.log(req.userRoles)
  
    if (old === '1') {
      query.createdAt = { $lte: new Date(Date.now() - 10 * 60 * 1000) };
    } else if (isNew === '1') {
      query.createdAt = { $gt: new Date(Date.now() - 10 * 60 * 1000) };
    }
  
    // const userRoles = req.user?.roles ?? [];
    
    const userRoles=[""]
  
    if (userRoles.includes('VIEW_ALL')) {
      BookModel.find(query, (err: any, books: any) => {
        if (err) {
          return res.status(500).json({ message: 'Internal Server Error' });
        }
  
        res.status(200).json({ books });
      });
    } else if (userRoles.includes('VIEWER')) {
    //   query.createdBy = req.user?.username;
  
      BookModel.find(query, (err: any, books: any) => {
        if (err) {
          return res.status(500).json({ message: 'Internal Server Error' });
        }
  
        res.status(200).json({ books });
      });
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  };
  