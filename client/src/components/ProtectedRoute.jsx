import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
const { user, loading } = useContext(AuthContext)

if(loading) {
  return (
    <div className="min-h-screen flex itms-center justify-center">
    <p className="text-slate-600">Checking session...</p>
    </div>
  )
}

return user ? children : <Navigate to="/login" />
}


export default ProtectedRoute