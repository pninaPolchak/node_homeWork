
import Joi from "joi";
import mongoose from "mongoose";
import {schemaMark} from "./mark.js";

let userSchema = mongoose.Schema({
    tz: String,
    userName: String,
    password: String,
    email: String,
    marks: [schemaMark],
    role: { type: String, default: "simpleUser" }

})

export const User = mongoose.model("users", userSchema)



export const userValidateForLogin = (_user) => {

    const schema = Joi.object({
        userName: Joi.string().min(1).max(20).required(),
        password: Joi.string().pattern(/^[a-zA-Z0-9]{7}$/).required(),
    });

    return schema.validate(_user);
}

export const userValidate = (_user) => {

    const schema = Joi.object({
        userName: Joi.string().min(1).max(30).required(),
        password: Joi.string().pattern(/^[a-zA-Z0-9]{7}$/).required(),
        tz: Joi.string().min(9).max(9).pattern(/^[0-9]{9}$/).required(),
        email: Joi.string().email().required()
    });

    return schema.validate(_user);
}