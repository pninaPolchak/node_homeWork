import mongoose from "mongoose";
import modelStudent from "../mudels/student.js";


const getAllStudent = async (req, res) => {

    let { search } = req.query;
    let perPage = req.query.perPage || 10;
    let page = req.query.page || 1;
    let ex1 = new RegExp(`${search}`)
    
    try {
        let filter = {};
        if (search)
            filter.name = ex1;

        let allStudent = await modelStudent.find(filter)
        .skip((page - 1) * perPage)
            .limit(perPage);
        
        res.json(allStudent);
    }
    catch (err) {
        res.status(404).json({ type: "error", message:err.message })
    }
}

const getByID = async (req, res) => {
    try {
        let { id } = req.params;

        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "id error", message: "id is not valid" })

        let student = await modelStudent.findOne({_id:id});

        if (!student)
            return res.status(400).json({ type: "id error", message: "id is not appear" })
        res.json(student);
    }

    catch (err) {
        res.status(404).json({ type: "error", message:err.message })
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
    catch (err) {
        res.status(404).json({ type: "error", message:err.message })
    }
}

const deleteStudentByID = async (req, res) => {
    try {
        let { id } = req.params;

        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "id error", message: "id is not valid" })

        let deleteStudent = await modelStudent.findByIdAndDelete({_id:id});
        if (!deleteStudent)
            return res.status(400).json({ type: "id error", message: "student is not appear" })
        res.json(deleteStudent);
    }
    catch (err) {
        res.status(404).json({ type: "error", message:err.message })
    }
}

const updateStudent = async (req, res) => {
    try {
        let { id } = req.params;

        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "id error", message: "id is not valid" })

        let updateStudent = await modelStudent.findById({_id:id});
        if (!updateStudent)
            return res.status(400).json({ type: "id error", message: "student is not appear" })
        updateStudent= await modelStudent.findByIdAndUpdate(id,req.body);
        res.json(updateStudent);
    }
    catch (err) {
            res.status(404).json({ type: "error", message:err.message })
        }
    
}
export { getAllStudent, getByID, addStudent, deleteStudentByID, updateStudent };





