import axios from "axios"

const backend_Url = import.meta.env.VITE_BACKEND_URL

export async function createVault(appname: string, accountId: string, password: string, userId:number|null) {
    const newVault = await axios.post(`${backend_Url}/createvault`, {
        appname: appname,
        accountId: accountId,
        password: password,
        userId: userId
    },{
        headers: {
            "authorization" : localStorage.getItem("authorization")
        }
    })
    return newVault
}

export async function deleteVault(vaultId: number) {
    const vault = await axios.post(`${backend_Url}/deletevault`, {
        vaultId: vaultId
    }, {
        headers: {
            "authorization" : localStorage.getItem("authorization")
        }
    })

    return vault
}

export async function updateVault(appname: string, accountId: string, password: string, vaultId: number) {
    const vault = await axios.post(`${backend_Url}/updatevault`, {
        appname: appname,
        accountId: accountId,
        password: password,
        vaultId: vaultId
    }, {
        headers: {
            "authorization": localStorage.getItem("authorization")
        }
    })
    return vault
}