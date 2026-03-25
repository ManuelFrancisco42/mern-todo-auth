import { useContext } from "react"
import { AuthContext } from "../context/AuthContext.js"
import TodoApp from "../components/TodoApp.jsx"


const Dashboard = () => {
  const { user, logout } = useContext(AuthContext)

  return (
    <div className='min-h-screen bg-slate-100'>
      <header className='bg-white shadow'>
        <div className='mx-auto max-w-4xl px-4 py-4 flex items-center justify-between'>
          <h1 className='text-lg font-semibold text-slate-800'>
            Todo Dashboard
          </h1>
          <div className='flex items-center gap-3'>
            <span className='text-sm text-slate-600'>
              {user?.username} ({user?.email})
            </span>
            <button
              type='button'
              onClick={logout}
              className='rounded-md bg-red-500 px-3 py-1 text-xs font-medium text-white hover:bg-red-600'
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className='mx-auto max-w-4xl px-4 py-6'>
        <TodoApp />
      </main>
    </div>
  )
}

export default Dashboard