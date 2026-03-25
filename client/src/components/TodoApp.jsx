 import { useState, useEffect } from 'react'
 import api from '../api/axios'

 const TodoApp = () => {
   const [todos, setTodos] = useState([])
   const [text, setText] = useState('')
   const [error, setError] = useState('')
   const [loading, setLoading] = useState(false)

   const fetchTodos = async () => {
     setLoading(true)
     try {
       const res = await api.get('/todos')
       setTodos(res.data)
     } catch (error) {
       console.error(error)
       setError('Failed to load todos')
     } finally {
       setLoading(false)
     }
   }

   const addTodo = async (event) => {
     event.preventDefault()

     if (!text.trim()) {
       setError('Todo text cannot be empty')
       return
     }

     try {
       const res = await api.post('/todos', { text })
       setTodos((prev) => [res.data, ...prev])
       setText('')
       setError('')
     } catch (error) {
       setError(error.response?.data?.message || 'Something went wrong')
     }
   }

   const toggleTodo = async (id, completed, text) => {
     try {
       const res = await api.patch(`/todos/${id}`, {
         completed: !completed,
         text,
       })
       setTodos((prev) => prev.map((t) => (t._id === id ? res.data : t)))
     } catch (error) {
       console.error(error)
     }
   }

   const deleteTodo = async (id) => {
     try {
       await api.delete(`/todos/${id}`)
       setTodos((prev) => prev.filter((t) => t._id !== id))
     } catch (error) {
       console.error(error)
     }
   }

   
   useEffect(() => {
     fetchTodos()
   }, [])

   return (
     <div className='mt-6 bg-white shadow rounded-lg p-4'>
       {error && (
         <div className='mb-3 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700'>
           {error}
         </div>
       )}

       <form
         onSubmit={addTodo}
         className='flex flex-col gap-2 sm:flex-row sm:items-center mb-4'
       >
         <label className='text-sm font-medium text-slate-700'>Add text</label>
         <input
           type='text'
           placeholder='New todo...'
           value={text}
           onChange={(e) => {
             setText(e.target.value)
             if (error) setError('')
           }}
           className='flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
         />
         <button
           type='submit'
           className='rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700'
         >
           Add
         </button>
       </form>

       {loading && <p className='text-sm text-slate-500'>Loading...</p>}

       <ul className='mt-2 space-y-2'>
         {todos.map((todo) => (
           <li
             key={todo._id}
             className='flex items-center justify-between rounded-md border border-slate-200 px-3 py-2'
           >
             <span
               onClick={() => toggleTodo(todo._id, todo.completed, todo.text)}
               className={`cursor-pointer text-sm ${
                 todo.completed ? 'line-through text-slate-400' : ''
               }`}
             >
               {todo.text}
             </span>
             <button
               onClick={() => deleteTodo(todo._id)}
               className='text-xs text-red-500 hover:text-red-700'
             >
               X
             </button>
           </li>
         ))}
       </ul>
     </div>
   )
 }

 export default TodoApp
