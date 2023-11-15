

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../Models/user';



export const registerUser = async (req: Request, res: Response) => {
  const { username, password, roles } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      password: hashedPassword,
      roles: roles || [],
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
  
    try {
      const user = await UserModel.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      const token = jwt.sign({ username, roles: user.roles }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
  
      res.status(200).json({ token, roles: user.roles }); 
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  