import mongoose from "mongoose";

const schemaMark=mongoose.Schema({
    profetion:{
        type:String,
        require:true
    },
    mark:Number,
})
const modelMark=mongoose.model("marks",schemaMark);
export default modelMark;
 