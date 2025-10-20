import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import mailSender from "../utils/mailSender.js"
import Welcome from "../templates/Welcome.js"

dotenv.config();

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {

        //validate fields
        if (!email || !password) {
            return res.status(400).json({ success: false, messagae: "All fields require" });
        }

        //check for user existience
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ success: false, message: "Admin not found" });
        }

        //check password with bcrypt
        const isMatch = await bcrypt.compare(password, userExist.password);

        if (isMatch && userExist.role === "admin") {
            //if password match then genrate token
            const payload = { email: email, id: userExist._id, role: userExist.role }
            const token = jwt.sign(payload, "dhanvarsha", { expiresIn: "30d" });
            userExist.token = token;
            res.cookie("token", token, { expires: new Date(Date.now() + 30 * 34 * 60 * 1000) }).status(200).json({ success: true, message: "Login successfully", user: userExist, token })
        } else {
            return res.status(400).json({ success: false, message: "Incorrect credentials" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: error, message: "Something went wrong while login" });
    }
}

export const signUp = async (req, res) => {
    const { name, email, password, contact, role } = req.body;

    try {
        //validate fields
        if (!name || !email || !password || !contact) {
            return res.status(400).json({ success: false, messagae: "All fields require" });
        }

        //check for user existience
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ success: false, message: "User already exist" });
        }

        //hash password with bcrypt
        const hashesPassword = await bcrypt.hash(password, 10)

        //add user in database 
        const user = await User.create({
            name,
            email,
            contact,
            role,
            password: hashesPassword,
        })

        const emailTemplate = await Welcome(user.name)
        const mailResponse = await mailSender(user.email, emailTemplate)
        console.log(mailResponse)

        //return response
        return res.status(201).json({ success: true, message: "User registered successfully", user })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: error, message: "Something went wrong while creating user" })
    }
}

export const getUserDetails = async (req, res) => {
    const { id } = req.user;

    try {
        const userExist = await User.findById(id).select("-password -enquiry ");

        if (!userExist) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, message: "User details fetch successfully", user: userExist });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong try again later", error });
    }

}
