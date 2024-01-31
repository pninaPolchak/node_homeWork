import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
import  cors  from "cors"

import connectingDB from "./config/configDB.js"
import studentRouter from "./routes/studentsRouter.js"
import marksRouter from "./routes/marksRouter.js"
import userRouter from './routes/user.js'
import { catchErrors } from "./middelwares/catchErorrs.js";
import { printDate,printMethod } from "./middelwares/printMiddleware.js";

const app = express();

config()

connectingDB()

app.use(printDate,printMethod)

app.use(morgan("common"));

app.use(express.json());

app.use(cors({ origin: "http://127.0.0.1:5400", methods: "*" }))

app.use("/api/students",studentRouter);

app.use("/api/marks",marksRouter);

app.use("/api/users", userRouter);

app.use(catchErrors);

let PORT=process.env.PORT||5000;
app.listen(PORT,()=>{console.log(`app is listening on port: ${PORT}`);});