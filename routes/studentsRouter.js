import express from "express";
import { getAllStudent,getByID,addStudent,updateStudent,deleteStudentByID } from "../controllers/studentControll.js";

const router = express.Router();


router.get("/",getAllStudent )

router.get("/:id",getByID)

router.post("/",addStudent)

router.delete("/:id",deleteStudentByID)

router.put("/:id",updateStudent )

export default router;