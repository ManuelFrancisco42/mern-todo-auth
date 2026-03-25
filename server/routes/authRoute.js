import express from "express"
import { login, me, register } from "../controllers/userController.js"
 

const userRouter = express.Router()

userRouter.post("/register",  register)
userRouter.post("/login", login)
userRouter.get("/me", me)


export default userRouter