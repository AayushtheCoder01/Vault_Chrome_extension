import jwt from 'jsonwebtoken'
import express, { NextFunction, Request, Response } from "express"
import {deleteVaultValidation, jwtValidation, updateVaultValidation, validateUser, vaultDataValidaton} from './middlewares/middlewares'
import { createUser, createVault, login, deleteVaultFn, updateVault } from './db_function'
import cors from "cors"
import { PrismaClient } from '@prisma/client'
import { error } from 'console'

interface CustomRequest extends Request {
    vaultId : number
    userData: any;
  }
  interface vaultCustomRequest extends Request {
    vaultData: {
        appname: string,
        accountId: string,
        password: string,
        userId?: number,
        vaultId?: number
    }
}

const jwt_key: any = process.env.JWT_KEY 
// const prisma = new PrismaClient()
const PORT = process.env.PORT
const app = express()
app.use(express.json())
app.use(cors())


app.post("/signup", validateUser, async(req:Request, res:Response) => {
    const customReq = req as CustomRequest;
    const data = customReq.userData.data
    const user: any = await createUser(data.email, data.password)

    if (user.status === true) {
        const token = await createJwt(req.body.email, req.body.password)
        res.status(200).json({
            message: user.message,
            authorization: token,
            userData: user.userData
        })
    }
    if (user.status === false) {
        res.status(400).json({
            message: user.message,
            status: user.status
        })
    }
})

app.post("/authlogin", jwtValidation, async (req: Request, res: Response) => {
    const costomReq = req as CustomRequest
    const userCred = costomReq.userData.data

    try {
        const userLogin : any = await login(userCred.email, userCred.password)
        if (userLogin.status === false) throw error

        res.json({
            message: "auth login successful",
            userData: userLogin.userData,
        })

    } catch (error) {
        res.status(400).json({
            message: "user not found"
        })
    }
})

app.post("/login", validateUser, async (req: Request, res: Response) => {
    const customReq: CustomRequest = req as CustomRequest
    const userCred = customReq.userData.data

    const userLogin: any = await login(userCred.email, userCred.password)
    try {
        if(userLogin.status === false) throw "user not found"
        if(userCred.password === userLogin.password) {
            const token = await createJwt(req.body.email, req.body.password)
            res.json({
            message: "login successful",
            authorization: token,
            userData: userLogin.userData,
        }).status(200)
        } else{
            res.status(400).json({  
            message: "wrong password"
        })
    }
    } catch (error) {
        res.status(400).json({
            message: "user not found",
            status: false
        })
    }
 
})

app.post("/createvault", jwtValidation, vaultDataValidaton, async(req:Request, res: Response) =>{
    const customReqVault = req as vaultCustomRequest
    const vaultData = customReqVault.vaultData
    let userId: any = null
    if(vaultData.userId) {
        userId = vaultData.userId
    }

    try {
        const newVault = await createVault(vaultData.appname, vaultData.password, userId, vaultData.accountId)

        if (newVault.status===false) throw newVault.message

        res.json({
            message: newVault.message
        })
    } catch (error) {
        res.json({
            message: "vault not created"
        }).status(400)
    }
})

app.post("/deletevault", jwtValidation, deleteVaultValidation, async(req: Request, res: Response) => {
    const customReq: CustomRequest = req as CustomRequest
    const vaultId: number = customReq.vaultId

    try {
        const deleteProcess = await deleteVaultFn(vaultId)
        if (deleteProcess.status === false) throw "error occured in delete process"

        res.status(200).json({
            message: "vault deleted successfully"
        })
    } catch (error) {
        res.status(400).json({
            message: "vault not deleted"
        })
    }
    
})

app.post("/updatevault", jwtValidation, updateVaultValidation, async(req: Request, res: Response)=> {
    const customReq: vaultCustomRequest = req as vaultCustomRequest
    const vaultData = customReq.vaultData
    const vaultId = vaultData.vaultId || 1

    try {
        const vault = await updateVault(vaultId, vaultData.appname, vaultData.password, vaultData.accountId) 

        if (vault.status===false) throw "vault not updated"
        res.status(200).json({
            message: "vault updated successfully"
        })
    } catch (error) {
        res.status(400).json({
            message: "vault not updated"
        })
    }

})


app.listen(PORT, ()=> {
    console.log(`backend is running on port ${PORT}`)
})

async function createJwt(email: string, password: string) {
    const token = jwt.sign({email,password}, jwt_key)
    return token
}