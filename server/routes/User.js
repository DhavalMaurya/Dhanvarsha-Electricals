import express from "express"
import { getUserDetails , login, signUp } from "../controllers/User.js"
import { isLogedIn } from "../middlewares/auth.js"

const userRouter = express.Router()

userRouter.post("/login" , login)
userRouter.post("/sign-up" , signUp)
userRouter.get("/user-details" ,isLogedIn ,getUserDetails);

export {userRouter}

