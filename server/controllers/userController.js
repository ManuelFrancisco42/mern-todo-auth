import mongoose from 'mongoose'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import UserModel from "../models/UserModels.js"



/* -------------------------------------------------------------------------- */
/*                                  REGISTER                                  */
/* -------------------------------------------------------------------------- */
export const register = async (req, res) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    return res.status(400).json({ message: ' All fields required' })
  }

  const exists = await UserModel.findOne({ email })
  if (exists) {
    return res.status(400).json({ message: 'Email already used' })
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await UserModel.create({
    username,
    email,
    password: hashedPassword,
  })

  res.status(201).json({ user, message: 'User created' })
}

/* -------------------------------------------------------------------------- */
/*                                  LOGIN                                     */
/* -------------------------------------------------------------------------- */
  export const login = async (req, res) => {
    const { email, password } = req.body

    const user = await UserModel.findOne({ email })
    if(!user) {
      return res.status(400).json({ message: "Invalid credentials"})
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match) {
      return res.status(400).json({ message: "Invalid credentials"})
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

    res.json({ message: "User logged in",  token, user: { id: user._id, username: user.username, email: user.email }, })
  }

  
/* -------------------------------------------------------------------------- */
/*                                  ME                                     */
/* -------------------------------------------------------------------------- */
export const me = async (req, res) => {
  const header = req.headers.authorization
  const token = header?.split(" ")[1]
  if(!token) {
    return res.starus(401).json({ message: "No token"})
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await UserModel.findById(decoded.id).select("-password")
    res.json(user)
  } catch (error) {
    res.status(401).json({ message: "Invalid token" })
  }
}