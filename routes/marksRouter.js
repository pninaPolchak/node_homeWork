import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("get all marks");
})
router.get("/:mark", (req, res) => {
    res.send("get " + req.params.mark);
})
router.post("/", (req, res) => {
    if (!req.body.mark || !req.body.compliment) {
        res.status(404);
        throw new Error("missing parameters");
    }
    res.send("add student" + req.body.compliment);
})
router.delete("/:mark", (req, res) => {
    res.send("remoev " + req.params.mark);
})
router.put("/:mark", (req, res) => {
    res.send("upddate " + req.params.mark);
})
export default router;