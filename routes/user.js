import express from "express";
import { addUser,login} from '../controllers/userControll.js';


const userRouter = express.Router();

userRouter.post('/', addUser);
userRouter.post('/login', login);

export default userRouter;