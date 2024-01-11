import mongoose from "mongoose";
import modelStudent from "../mudels/student.js";


const getAllStudent = async (req, res) => {
    let { search } = req.query;
    let perPage = req.query.perPage || 10;
    let page = req.query.page || 1;
    
    try {

        let filter = {};
        if (search){
            let ex1 = new RegExp(`${search}`);
        filter.name = ex1;}
            
        // let allStudent = await modelStudent.find({_name:es1})
        let allStudent = await modelStudent.find(filter)
            .skip(page * (perPage - 1))
            .limit(perPage);
        res.json(allStudent);
    }
    catch {
       
        (err) => {
            res.status(404).json({ type: "error", message: err.message })
        }
    }
}

const getByID = async (req, res) => {
    try {
        let { id } = req.params;

        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "id error", message: "id is not valid" })

        student = await modelStudent.findOne(id);

        if (!student)
            return res.status(400).json({ type: "id error", message: "id is not appear" })
        res.json(student);
    }

    catch {
        (err) => {
            res.status(404).json({ type: "error", message: err.message })
        }
    }

}

const addStudent = async (req, res) => {
    try {
        let { name, grade } = req.body;
        if (!req.body.name || !req.body.grade)
            return res.status(404).json({ type: "mising parameters", message: "missing grade /name" });
        let sameStudent = await modelStudent.findOne({ name, grade });
        if (sameStudent)
            return res.status(400).json({ type: "database error", message: "there is same student" })
        let newStudent = await modelStudent.create({ name, grade });
        res.json(newStudent);
    }
    catch {
        (err) => {
            res.status(404).json({ type: "error", message: err.message })
        }
    }
}

const deleteStudentByID = async (req, res) => {
    try {
        let { id } = req.params;

        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "id error", message: "id is not valid" })

        let deleteStudent = await modelStudent.findByIdAndDelete(id);
        if (!deleteStudent)
            return res.status(400).json({ type: "id error", message: "student is not appear" })
        res.json(deleteStudent);
    }
    catch {
        (err) => {
            res.status(404).json({ type: "error", message: err.message })
        }
    }
}

const updateStudent = async (req, res) => {
    try {
        let { id } = req.params;

        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "id error", message: "id is not valid" })

        let updateStudent = await modelStudent.findById(id);
        if (!updateStudent)
            return res.status(400).json({ type: "id error", message: "student is not appear" })
        updateStudent= await modelStudent.findByIdAndApdate(id,req.body);
        //  = await modelStudent.findById(id);
        res.json(updateStudent);
    }
    catch {
        (err) => {
            res.status(404).json({ type: "error", message:err.message })
        }
    }
}
export { getAllStudent, getByID, addStudent, deleteStudentByID, updateStudent };





