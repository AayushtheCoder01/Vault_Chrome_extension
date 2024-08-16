// import { useState } from 'react'
// import './App.css'
// import LoginPage from './pages/login/login'
// import { useRecoilValue } from 'recoil'
// import { themeAtom } from './store/store'

import { Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import LoginPage from "./pages/login/login"
import SignupPage from "./pages/signup/signup"
import Vault from "./pages/vault/vault"

// import LoginPage from "./pages/login/login"


function App() {
  // const [count, setCount] = useState(0)
  // const theme = useRecoilValue(themeAtom)

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/vaults" element={<Vault/>} />
      </Route>
    </Routes>
    
  )
}

export default App
