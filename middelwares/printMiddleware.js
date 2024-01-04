import mongoose from "mongoose";

export function printDate(req, res, next) {
    console.log(new Date())
    next()
}
export function printMethod(req, res, next) {
    req.myName = "pmimi";
    console.log(req.myName);
    console.log(req.method);
    next()
}