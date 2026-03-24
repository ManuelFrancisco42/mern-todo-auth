 import TodoModel from "../models/TodoModel.js";

/* -------------------------------------------------------------------------- */
/*                               GET /api/todos                               */
/* -------------------------------------------------------------------------- */
export const getAllTodosController = async (req, res) => {
 try {
   const todos = await TodoModel.find({ user: req.userId }).sort({
     createdAt: -1,
   })
   res.json(todos)
 } catch (error) {
  res.status(500).json({ error, message: 'Server error' })
 }
};

/* -------------------------------------------------------------------------- */
/*                             POST / api / todos                             */
/* -------------------------------------------------------------------------- */
export const createTodoController = async (req, res) => {
 try {
   const { text } = req.body
   if (!text || !text.trim()) {
     return res.status(400).json({ message: 'Todo text is required' })
   }

   const todo = await TodoModel.create({ text, user: req.userId })
   res.status(201).json(todo)
 } catch (error) {
  res.status(500).json({ error, message: "Server error"})
 }
}

/* -------------------------------------------------------------------------- */
/*                            PATCH /api/todos/:id                            */
/* -------------------------------------------------------------------------- */
export const updateTodoController = async (req, res) => {
  try {
    const { id } = req.params
    const { completed, text } = req.body

    const todo = await TodoModel.findOneAndUpdate(
      { _id: id, user: req.userId },
      { completed, text },
      { new: true },
    )
    if (!todo) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.json(todo)
  } catch (error) {
    res.status(500).json({ error, message: 'Server error' })
  }
}

/* -------------------------------------------------------------------------- */
/*                            DELETE /api/todos/:id                           */
/* -------------------------------------------------------------------------- */
export const deleteTodoController = async (req, res) => {
  try {
    const { id } = req.params

    const todo = await TodoModel.findByIdAndDelete({
      _id: id,
      user: req.userId,
    })
    if (!todo) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.json({ message: 'Todo deleted', id })
  } catch (error) {
    res.status(500).json({ error, message: 'Server error' })
  }
}