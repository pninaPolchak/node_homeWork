
import mongoose from "mongoose";

const schemaStudent = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    
    grade: Number,

    bornDate: {
        type: Date,
        default: Date.now()
    }
})
const modelStudent = mongoose.model("students", schemaStudent);
export default modelStudent;


