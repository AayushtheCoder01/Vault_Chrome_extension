// import React from 'react'
import { useRecoilValue } from "recoil"
import "./vault.css"
import Vcard from "./Vcard"
import { loginAtom, userDataAtom } from "../../store/store"
import CreatV from "./creatV"
import { useEffect } from "react"
function Vault () {
  const isLogin = useRecoilValue(loginAtom)
  const userData = useRecoilValue(userDataAtom)
  const vaults = userData.vaults

  useEffect(() => {
  }, [])
  return (
    <>
    <div className="h-screen w-full mt-16 md:mt-20">
      {isLogin? <CreatV/> : 
      <div>
        <p className="text-center text-black dark:text-white">Loading///</p>
      </div>
      }

      <div className="flex flex-wrap justify-center">
        {/* card */}
        {
          vaults.map(vault => {
            return (
              <Vcard data={vault}/>
            )
          })
        }
        
        {/* card */}
      </div>
    </div>
    </>
  )
}

export default Vault