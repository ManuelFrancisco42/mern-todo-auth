import express from "express"
import { createTodoController, deleteTodoController, getAllTodosControllers, updateTodoController } from "../controllers/todoController.js"
import authMiddleware from "../middleware/authMiddleware.js"



const todoRouter = express.Router()

 todoRouter.use(authMiddleware)


todoRouter.get("/", getAllTodosControllers)
todoRouter.post("/", createTodoController)
todoRouter.patch("/:id", updateTodoController)
todoRouter.delete("/:id", deleteTodoController)


export default todoRouter