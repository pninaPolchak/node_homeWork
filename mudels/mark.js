import mongoose from "mongoose";

export const schemaMark=mongoose.Schema({
    profetion:{
        type:String,
        require:true
    },
    mark:Number,
})
export const modelMark=mongoose.model("marks",schemaMark);

 