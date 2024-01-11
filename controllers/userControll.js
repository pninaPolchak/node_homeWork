import {hash,compare} from "bcrypt"
import { User, userValidate, userValidateForLogin } from "../mudels/user.js";
import { generateToken } from "../middelwares/generateToken.js";

export const addUser = async (req, res) => {
    
    let validate = userValidate(req.body);
    if (validate.error)
        return res.status(400).json({ type: "not valid", message: validate.error.details[0].message });
    let { userName, password, tz, email } = req.body;

    try {
        let sameUser = await User.findOne({ $or: [{ userName: userName }, { tz: tz }] })
        if (sameUser)
            return res.status(409).json({ type: "same user", message: "there is same user" })
        let hashesPass = await hash(password, 10);
        let newUser = new User({ userName, password:hashesPass, email, tz });
        await newUser.save();
        let token = generateToken(newUser)
        return res.json({ token })
        
    } catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }

}

export const login = async (req, res) => {
   
    let validate = userValidateForLogin(req.body);
    if (validate.error)
        return res.status(400).json({ type: "not valid", message: validate.error.details[0].message });

    try {
        let user = await User.findOne({ userName: req.body.userName })
        if (!user || !await compare(req.body.password, user.password))
            res.status(404).json({ type: "there is no user with this details", message: "please add yourself" })
            let token = generateToken(user)
            return res.json({ token })  
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}