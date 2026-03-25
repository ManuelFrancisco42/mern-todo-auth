import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.js"
import { useNavigate, Link } from "react-router-dom"


const Login = () => {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate('/')
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='w-full max-w-md bg-white shadow-md rounded-lg p-6'>
        <h2 className='text-xl font-semibold text-slate-800 mb-4 text-center'>
          Login
        </h2>

        {error && (
          <p className='mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2'>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className='space-y-3'>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>
              Email
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter Email'
              className='w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>
              Password
            </label>

            <input
              type='password'
              value={password}
              placeholder='Enter Password'
              onChange={(e) => setPassword(e.target.value)}
              className='w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
          </div>

          <button
            type='submit'
            className='w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700'
          >
            Login
          </button>
        </form>

        <p className='mt-4 text-center text-sm text-slate-600'>
          No account?{' '}
          <Link
            to='/register'
            className='text-indigo-600 hover:text-indigo-800 font-medium'
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
 