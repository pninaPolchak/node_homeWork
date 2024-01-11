import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const authorized = async (req, res, next) => {

    let token = req.headers["my-token"];
    if (!token)
        return res.status(401).json({ type: "not authorized", message: "user not authorized" })
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        return res.status(401).json({ type: "not authorized", message: "user not authorized" })
    }


}