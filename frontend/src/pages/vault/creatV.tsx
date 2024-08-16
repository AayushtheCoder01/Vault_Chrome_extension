// import React from 'react'
import { useState } from "react"
import { createVault } from "./vaultFeatures"
import { useRecoilValue } from "recoil"
import { userDataAtom } from "../../store/store"

function CreatV() {
    const [newVault, setNewVault] = useState(false)
    const [loading, setLoading] = useState(false)
    const [vaultData, setVaultData] = useState({
        appname: "",
        accountId: "",
        password: "",
      })
      const userData = useRecoilValue(userDataAtom)
    async function createNewVault(e: any) {
        e.preventDefault()
        setLoading(true)
        try {
            const vault = await createVault(vaultData.appname, vaultData.accountId,vaultData.password, userData.userId)
            console.log(vault)
            setNewVault(false)
            setLoading(false)
            window.location.reload()
        } catch (error: any) {
            const message = error.response.data.message
            console.log(message)
            setLoading(false)
        }
    }

  return (
   <>
   <div className="mb-4">
    <div className="flex justify-center pt-5">
        {newVault? "" :
    <button onClick={() => setNewVault(!newVault)} className="bg-emerald-500 hover:scale-110 active:scale-90 transition duration-300 ease-in-out text-white font-mono px-5 md:px-7 md:py-2 rounded-sm p-1">New Vault</button>   
    }
    </div>
    {
        newVault? <div className="flex justify-center">
        <div className="card my-4 text-black dark:text-white bg-zinc-800 m-1 p-1 px-2 w-10/12 mx-2 md:w-3/12 rounded-md">
        <div className="flex justify-end pr-7 pt-4">
            <p onClick={() => setNewVault(!newVault)} className="cursor-pointer">X</p>
        </div>
             <div className="px-2 pb-2">
              <h3 className="text-xl font-sans font-bold m-1 text-blue-500">App Name</h3>
              <input onChange={(e) => setVaultData({...vaultData, appname: e.target.value})} type="text" value={vaultData.appname} className="bg-zinc-700 text-white mt-2 mb-2 p-2 px-3 rounded-lg w-full" />
    
              <h3 className="text-xl font-sans font-bold m-1 text-blue-500">Account Id</h3>
              <input onChange={(e) => setVaultData({...vaultData, accountId: e.target.value})} type="text" value={vaultData.accountId} className="bg-zinc-700 text-white  mt-2 mb-2 p-2 px-3 rounded-lg w-full" />
    
              <h3 className="text-xl font-sans font-bold m-1 text-blue-500">Password</h3>
              <input onChange={(e) => setVaultData({...vaultData, password: e.target.value})} type="text" value={vaultData.password} className="bg-zinc-700 text-white mt-2 mb-2 p-2 px-3 rounded-lg w-full" />

                <div className='flex justify-center my-5'>
                    {loading? "Loding///" : <button onClick={createNewVault} className='bg-blue-600 p-2 h-10 w-2/12 rounded-md transition duration-200 ease-in-out hover:scale-105 active:scale-100'>save</button> }
                </div>
             </div>
            </div>
        </div> : ""
    }
   </div>
   </>
  )
}

export default CreatV