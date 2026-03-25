import TodoModel from '../models/todoModel.js'

/* -------------------------------------------------------------------------- */
/*                                GET ALL TODOS                               */
/* -------------------------------------------------------------------------- */
export const getAllTodosControllers = async (req, res) => {
  try {
    const todos = await TodoModel.find().sort({ createdAt: -1 })
    res.status(200).json(todos)
  } catch (error) {
    res.status(500).json({ message: error })
    res.status(500).json({ message: 'Server error while creating todo.' })
  }
}

/* -------------------------------------------------------------------------- */
/*                                 CREATE TODO                                */
/* -------------------------------------------------------------------------- */
export const createTodoController = async (req, res) => {
  try {
    const { text } = req.body
    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Todo text is required' })
    }
    const todo = await TodoModel.create({ text })
    res.status(201).json(todo)
  } catch (error) {
    res.status(500).json({ message: 'Server error while creating todo.' })
  }
}

/* -------------------------------------------------------------------------- */
/*                                 UPDATE TODO                                */
/* -------------------------------------------------------------------------- */
export const updateTodoController = async (req, res) => {
  try {
    const { id } = req.params
    const { completed, text } = req.body
    const todo = await TodoModel.findByIdAndUpdate(
      id,
      { completed, text },
      { returnDocument: 'after', runValidators: true },
    )
    if (!todo) {
      return res.status(404).json({ message: 'Not found' })
    }
    res.json(todo)
  } catch (error) {
    res.status(500).json({ message: 'Server error while creating todo.' })
  }
}

/* -------------------------------------------------------------------------- */
/*                                 DELETE TODO                                */
/* -------------------------------------------------------------------------- */
export const deleteTodoController = async (req, res) => {
  try {
    const { id } = req.params
    const todo = await TodoModel.findByIdAndDelete(id)
    if (!todo) {
      return res.status(404).json({ message: 'Not found' })
    }
    res.json({ message: 'Deleted', id })
  } catch (error) {
    res.status(500).json({ message: 'Server error while creating todo.' })
  }
}