
import express from "express";

 export const catchErrors = ((error,req,res,send)=> {
   let statusCode=res.status||500;
   res.status(statusCode).send(error.message||"err in saerver")
}) 
 