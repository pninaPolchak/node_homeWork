import jwt from "jsonwebtoken";


export const generateToken = (user) => {
    let jwtSecretKey = process.env.JWT_SECRET||"ILoveKnowNode"
    let data = {
        userName: user.userName,
        _id: user._id,
        role: user.role
    }

    const token = jwt.sign(data, jwtSecretKey, {
        expiresIn: '1h',
    });

    return token;
}