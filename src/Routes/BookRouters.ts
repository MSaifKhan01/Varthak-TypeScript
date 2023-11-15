import express from 'express';
import { createBook, getBooks } from '../Controller/Book';
import { auth } from '../middleware/Auth';
import { RoleBase } from '../middleware/roleBase';

const BookRouter = express.Router();




BookRouter.post('/books', auth,RoleBase(["CREATOR"]), createBook); 
BookRouter.get('/books',auth ,RoleBase(["VIEWER", "VIEW_ALL"]) ,getBooks); 






export default BookRouter;