import express from 'express';
import { registerUser,loginUser } from '../Controller/user';

const UserRouter = express.Router();




UserRouter.post('/register', registerUser);
UserRouter.post('/login', loginUser);

export default UserRouter;