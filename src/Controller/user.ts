
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../Models/user';




 export const registerUser= async (req: Request, res: Response) => {
    const { username, password, roles } = req.body;
    const user = await UserModel.findOne({ username });
    if (user?.username) {
      res.send("User already present");
    } else {
      try {
        bcrypt.hash(password, 4, async (err, hash) => {
          if (hash) {
            const user = new UserModel({ username, password: hash, roles });
            await user.save();
            res.send("Registration succesfull");
          }
        });
      } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
    }
  };
  
 export const loginUser= async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    console.log(user)
    if (user?.username) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { user_id: user._id, role: user.roles },
            process.env.JWT_SECRET ||'',
            { expiresIn: "1h" }
          );
          // res.cookie("token", token, { httpOnly: true });
          res.send({ msg: "Logged in succesfull", token });
        } else {
          res.send("Invalid credentials");
        }
      });
    } else {
      res.send("Invalid credentials");
    }
  };