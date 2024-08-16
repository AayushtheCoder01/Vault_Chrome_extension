import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { LuSun } from "react-icons/lu";
import { IoMoonOutline } from "react-icons/io5";
import { loginAtom, themeAtom, userDataAtom } from '../../store/store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IoLogOutOutline } from "react-icons/io5";


interface headerProps{

}
const Header:React.FC<headerProps> = ({}) => { 
    const [theme, setTheme] = useRecoilState(themeAtom)
    const isLogin = useRecoilValue(loginAtom)
    const userData = useRecoilValue(userDataAtom)
    function changeTheme() {
        setTheme(!theme)
        removerClass()
    }

    function removerClass() {
        if(theme === true) {
                document.documentElement.classList.add('dark');
        }
        if(theme===false){
            document.documentElement.classList.remove('dark');
        }
    }

    function logout() {
        localStorage.removeItem("authorization")
        window.location.reload()
    }

    useEffect(()=> {
        removerClass()
    }, [])
  return (
    <header className="fixed px-5 flex justify-between top-0 left-0 right-0 z-10 bg-opacity-10 border-b-2 dark:border-gray-800 bg-transparent backdrop-filter backdrop-blur-md p-2">
       <div className='flex justify-center w-2/12 items-center text-black dark:text-white p-1'>
            <h1 className='text-2xl md:text-3xl cursor-pointer text-green-500 font-bold font-mono hover:text-blue-500 transition-colors duration-300'>va<span className='text-blue-500 hover:text-yellow-500 transition-colors duration-300'>ult</span></h1>
       </div>

       <div className='flex justify-center items-center text-black dark:text-white'>
            {isLogin? <p>{userData.email}</p>: <div>
                <NavLink to={"/login"} className={`px-2`}>
                <a href="#_" className="inline-flex items-center bg-black dark:hover:bg-transparent dark:hover:text-white dark:bg-white dark:text-black text-black justify-center h-10 px-3 py-0 text-md font-semibold text-center no-underline align-middle transition-all duration-300 ease-in-out bg-transparent border-2 border-gray-600 border-solid rounded-lg cursor-pointer select-none hover:border-green-500 focus:shadow-xs focus:no-underline">
                        Sign In
                </a>
            </NavLink>

                <NavLink to={"/signup"}>
                <a href="#_" className="inline-flex items-center bg-white dark:bg-transparent text-black dark:text-white justify-center h-10 px-3 py-0 text-md font-semibold text-center no-underline align-middle transition-all duration-300 ease-in-out bg-transparent border-2 border-gray-600 border-solid rounded-lg cursor-pointer select-none hover:border-green-500 focus:shadow-xs focus:no-underline">
                        Sign Up
                </a>
                </NavLink>
            </div>}
            

             <div className='bg-transparent flex p-1 mx-2 cursor-pointer'>
             {theme? <p onClick={changeTheme} className='hover:scale-110 transition duration-300 ease-in-out'><LuSun  size={"1.5rem"}/></p>:<p onClick={changeTheme}  className='hover:scale-110 transition duration-300 ease-in-out'><IoMoonOutline size={"1.5rem"}/></p>}
             {isLogin? <p onClick={logout} className='text-red-500 ml-4 hover:scale-110 transition duration-300 ease-in-out'><IoLogOutOutline size={"1.5rem"}/></p>: null}
            </div>   
       </div>
    </header>
  )
}

export default Header