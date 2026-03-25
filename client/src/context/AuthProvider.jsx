import { useState, useEffect } from "react";
import api from "../api/axios";
import { AuthContext } from "./AuthContext";

 

export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null)
const [token, setToken] = useState(localStorage.getItem("token") || "")
const [loading, setLoading] = useState(true)




/* -------------------------------------------------------------------------- */
/*                                   LOGOUT                                   */
/* -------------------------------------------------------------------------- */
const logout = () => {
setUser(null)
setToken("")
localStorage.removeItem("token")
}

/* -------------------------------------------------------------------------- */
/*                                  USEEFFECT                                 */
/* -------------------------------------------------------------------------- */
useEffect(() => {
  if(token) {
    api.get("/auth/me").then((res) => setUser(res.data)).catch(() => logout()).finally(() => setLoading(false))
  } else {
    setLoading(false)
  }
}, [token])

/* -------------------------------------------------------------------------- */
/*                                    LOGIN                                   */
/* -------------------------------------------------------------------------- */
const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password })
  setToken(res.data.token)
  localStorage.setItem("token", res.data.token)
  setUser(res.data.user)
}

/* -------------------------------------------------------------------------- */
/*                                  REGISTER                                  */
/* -------------------------------------------------------------------------- */
const register = async (username, email, password) => {
  await api.post("/auth/register", { username, email, password })
}




  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}