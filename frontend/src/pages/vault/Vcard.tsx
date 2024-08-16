import React, { useState } from 'react'
import { HiPencilAlt } from "react-icons/hi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { deleteVault, updateVault } from './vaultFeatures';

interface props{
    data:any
}
const Vcard:React.FC<props> = ({data}) => {
    const [editmode, setEditmode] = useState(false)
    const [loading, setLoading] = useState(false)
    const [vaultData, setVaultData] = useState({
      appname: data.appname,
      accountId: data.accountId,
      password: data.passowrd,
    })
    const vaultId = data.id

    function setEditFn () {
        setEditmode(prev => !prev)
    }

    async function deleteV(e: any) {
      e.preventDefault()
      setLoading(true)
      try {
        const vault = await deleteVault(vaultId)
        console.log(vault.data.message)
        setLoading(true)
        window.location.reload()
      } catch (error: any) {
        const message = error.response.data.message
        console.log(message)
        setLoading(true)

      }
    }

    async function updateV(e:any){
      e.preventDefault()
      try {
        const vault = await updateVault(vaultData.appname, vaultData.accountId, vaultData.password, vaultId)
        if(vault.status === 200) {
          window.location.reload()
          console.log(vault.data.message)
        }
      } catch (error: any) {
          const message = error.response.data.message 
          console.log(message)
      }
    }
  return (
    <>
    <div className="card my-6 mx-6 text-black dark:text-white bg-zinc-800 m-1 p-1 px-2 w-10/12 md:w-3/12 rounded-md">
         <div className="flex justify-end pr-1 mt-2 text-white dark:text-white">
            <p className='cursor-pointer'>
                {editmode? <p onClick={setEditFn} className='text-lg'>X</p> : <div className='flex'> <p className='hover:scale-110 transition duration-300 ease-in-out' onClick={setEditFn}><HiPencilAlt size={"1.5rem"} /></p> <p onClick={deleteV} className='mx-1 text-red-500 hover:scale-110 transition duration-300 ease-in-out'><MdOutlineDeleteOutline size={"1.5rem"}/></p></div>}
            
            </p>
         </div>

         <div className="px-2 pb-2">
          <h3 className="text-xl font-sans font-bold m-1 text-green-500">App Name</h3>
          <input onChange={(e) => setVaultData({...vaultData, appname: e.target.value})} readOnly={!editmode} type="text" value={vaultData.appname} className="bg-zinc-700 text-white mt-2 mb-2 p-2 px-3 rounded-lg w-full" />

          <h3 className="text-xl font-sans font-bold m-1 text-green-500">Account Id</h3>
          <input onChange={(e) => setVaultData({...vaultData, accountId: e.target.value})} readOnly={!editmode} type="text" value={vaultData.accountId} className="bg-zinc-700 text-white  mt-2 mb-2 p-2 px-3 rounded-lg w-full" />

          <h3 className="text-xl font-sans font-bold m-1 text-green-500">Password</h3>
          <input onChange={(e) => setVaultData({...vaultData, password: e.target.value})} readOnly={!editmode} type="text" value={vaultData.password} className="bg-zinc-700 text-white mt-2 mb-2 p-2 px-3 rounded-lg w-full" />

          {editmode? 
            <div className='flex justify-center my-5'>
              {loading? "Loading///" : <button onClick={updateV} className='bg-blue-600 p-2 h-10 w-2/12 rounded-md transition duration-200 ease-in-out hover:scale-105 active:scale-100'>save</button>}
            </div>
            :
            ""
          }    
         </div>
        </div>
        
    </>
  )
}

export default Vcard