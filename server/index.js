import express from "express"
import cors from "cors"
import "colors"
import dotenv from "dotenv"
import connectDB from "./config/connectDB.js"
import userRouter from "./routes/authRoute.js"
import todoRouter from "./routes/todosRoute.js"
dotenv.config()

const app = express()


app.use(cors())
app.use(express.json())

/* -------------------------------------------------------------------------- */
/*                                   ROUTER                                   */
/* -------------------------------------------------------------------------- */
app.use('/api/auth', userRouter)
app.use('/api/todos', todoRouter)





/* -------------------------------------------------------------------------- */
/*                            START THE APPLICATION                           */
/* -------------------------------------------------------------------------- */
const PORT = process.env.PORT || 5000
const startApp = () => {
  try {
    connectDB()
    app.listen(PORT, () => console.log(`Server is up and running on port: ${PORT}`.gray.bold.underline))
  } catch (error) {
    console.error("Server failed to run".red.bold.underline)
  }
}

startApp()