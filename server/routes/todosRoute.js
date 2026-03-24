import express from "express"
import { createTodoController, deleteTodoController, getAllTodosController, updateTodoController } from "../controllers/todoController.js"
import authMiddleware from "../middleware/authMiddleware.js"



const todoRouter = express.Router()

 todoRouter.use(authMiddleware)


todoRouter.get("/", getAllTodosController)
todoRouter.post("/", createTodoController)
todoRouter.patch("/:id", updateTodoController)
todoRouter.delete("/:id", deleteTodoController)


export default todoRouter