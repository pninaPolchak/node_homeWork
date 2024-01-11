import express from "express";
import { getAllStudent,getByID,addStudent,updateStudent,deleteStudentByID } from "../controllers/studentControll.js";
import { authorized } from "../middelwares/authorized.js";

const router = express.Router();


router.get("/",getAllStudent )

router.get("/:id",getByID)

router.post("/",authorized,addStudent)

router.delete("/:id",deleteStudentByID)

router.put("/:id",updateStudent )

export default router;