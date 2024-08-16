
import { Outlet, useNavigate } from 'react-router-dom'
import Header from './pages/headerpage/header'
import { useSetRecoilState } from 'recoil'
import { loginAtom, userDataAtom } from './store/store'
import axios from 'axios'
import { useEffect } from 'react'
function Layout() {
  const backend_Url = import.meta.env.VITE_BACKEND_URL

  const setLoginAtom = useSetRecoilState(loginAtom)
  const setDataAtom = useSetRecoilState(userDataAtom)
  const navigate = useNavigate()
  async function authLogin() {
    try {
      const user = await axios.post(`${backend_Url}/authlogin`, {

      },{
        headers: {
          "authorization" : localStorage.getItem("authorization")
        }
      })
      setLoginAtom(true)
      setDataAtom({email: user.data.userData.email, vaults: user.data.userData.vaults.reverse(), userId: user.data.userData.userId})
      navigate("/vaults")
    } catch (error:any) {
      const message = error.response.data.message
      console.log(message)
      navigate("/login")
    }  
  }
  
  useEffect(()=> {
    authLogin()
  }, [])
  
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
    
  )
}

export default Layout