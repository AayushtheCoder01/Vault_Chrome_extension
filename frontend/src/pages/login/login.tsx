// import React from 'react'
import { useState } from 'react'
import Button from '../../components/Buttons/button'
import { userLogin } from './loginFn'
import { useSetRecoilState } from 'recoil'
import { loginAtom, userDataAtom } from '../../store/store'
import { useNavigate } from 'react-router-dom'

interface loginProps {
    // email: string,
    // password: string
}
const LoginPage: React.FC<loginProps> = () => {
  const [userInput, setUserInput] = useState({
    email: '',
    password: ''
  })
  const setLoginAtom = useSetRecoilState(loginAtom)
  const setDataAtom = useSetRecoilState(userDataAtom)
  const navigate = useNavigate()
  async function login(e: any) {
    e.preventDefault()
    try {
      const user = await userLogin(userInput.email, userInput.password)
      localStorage.setItem("authorization", user.data.authorization)
      setLoginAtom(true)
      setDataAtom({email: user.data.userData.email, vaults: user.data.userData.vaults.reverse(), userId: user.data.userData.userId})
      navigate("/vaults")
    } catch (error:any) {
      const message = error.response.data.message
      console.log(message)
    }
  }
  return (
    <div className='h-screen mt-10 w-full flex m-0 p-0 justify-center items-center'>
      <div className='bg-transparent backdrop-blur-sm border flex flex-col w-[80%] lg:w-4/12 border-gray-700 hover:border-indigo-700 rounded-md p-2 py-4'>
        <h1 className='text-black text-2xl font-bold font-mono text-center dark:text-green-500'>Login</h1>

          <div className='flex flex-col p-4 mb-1'>
            <label className='text-left text-black dark:text-white m-1 mt-3 pl-1'>Email</label>
            <input onChange={(e) => setUserInput({...userInput, email: e.target.value})} type='email' className='dark:bg-slate-800 backdrop-blur-sm border border-gray-700 h-[2.5rem] text-black dark:text-gray-300 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800 cursor-pointer rounded-full p-1 px-3' placeholder='example@gmail.com'/>
            <label className='text-left text-black dark:text-white m-1 mt-3 pl-1'>Password</label>
            <input onChange={(e) => setUserInput({...userInput, password: e.target.value})} type='password' className='dark:bg-slate-800 backdrop-blur-sm border border-gray-700 h-[2.5rem] text-black dark:text-gray-300 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800 cursor-pointer rounded-full p-1 px-3' placeholder='Doe@123'/>
            <p className='text-end text-black dark:text-white cursor-pointer m-1 pr-2 hover:underline'>forgot password?</p>
            <div onClick={login} className='m-1 mt-7 flex justify-center'><Button text='Sign In'/></div>
          </div>

          <div className='flex p-2 flex-col'>
            <h2 className='text-black dark:text-white mb-2 text-center'>or Sign In with</h2>
            <div className='dark:bg-zinc-800  w-12/12 flex my-2 border border-gray-800 hover:bg-green-600 cursor-pointer justify-center items-center text-black dark:text-white rounded-full p-1 py-2'>
              <img className='h-8 px-2' src='https://img.icons8.com/?size=100&id=17949&format=png&color=000000'/>
              <p>Google</p>
            </div>

            <div className='dark:bg-zinc-800 w-12/12 flex border border-gray-800 hover:bg-purple-500 cursor-pointer justify-center items-center text-black dark:text-white rounded-full p-1 py-2'>
              <img className='h-8 px-2' src='https://img.icons8.com/?size=100&id=12599&format=png&color=000000'/>
              <p>Github</p>
            </div>
          </div>
      </div>
    </div>
   
  )
}

export default LoginPage