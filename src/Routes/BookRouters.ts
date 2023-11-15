import express from 'express';
import { createBook, getBooks } from '../Controller/Book';
import { auth } from '../middleware/Auth';

const BookRouter = express.Router();




BookRouter.post('/books', auth(['CREATOR'])||auth(['VIEW_ALL']), createBook); 
BookRouter.get('/books', auth(['VIEWER']), getBooks); 






export default BookRouter;
