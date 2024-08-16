import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response, } from 'express'
import { createUser, createVaultZodS, deleteVault, updateVaultZod } from './validation'


interface CustomRequest extends Request {
    vaultId: number
    userData: any
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
dotenv.config();
const jwt_key: any = process.env.JWT_KEY

export function validateUser(req: Request, res: Response, next: NextFunction): void {
    const data = createUser.safeParse({
        email: req.body.email,
        password: req.body.password
    })

    if (data.success) {
        const customReq: CustomRequest = req as CustomRequest
        customReq.userData = data
        next()
    } else {
        res.status(400).json({
            msg: "wrong inputs"
        })
    }
}
export function jwtValidation(req: Request, res: Response, next: NextFunction): void {

    try {
        const jwt_token: any = req.headers.authorization
        const verify:any = jwt.verify(jwt_token, jwt_key)
        // next()
        const data = createUser.safeParse({
            email: verify.email,
            password: verify.password
        })
        if(data.success === false) throw "error in data parsing"
        if (data.success) {
            const customReq: CustomRequest = req as CustomRequest
            customReq.userData = data
            next()
        } 
    } catch (error) {
     res.status(400).json({
        message: "jwt validation failed."
     })   
    }
   
}

export function vaultDataValidaton(req:Request, res: Response, next: NextFunction) {
    try {
        const parsedData = createVaultZodS.safeParse({
            appname: req.body.appname,
            accountId: req.body.accountId,
            password: req.body.password,
            userId: req.body.userId,
        })

       if(parsedData.success === false) throw "wornd inputs in api request body"

        if (parsedData.success) {
            const customReq: vaultCustomRequest = req as vaultCustomRequest
            customReq.vaultData = parsedData.data 
            next()
        }
    } catch (error) {
        res.status(400).json({
            message: "worng inputs in api request body"
         }) 
    }
}

export function deleteVaultValidation(req: Request, res: Response, next: NextFunction){
    try {
        const parsedData = deleteVault.safeParse({
            vaultId : req.body.vaultId
       })

       if(parsedData.success === false) throw "wornd inputs in api request body"
       if (parsedData.success) {
           const customreq: CustomRequest = req as CustomRequest
           customreq.vaultId = parsedData.data.vaultId
           next()
       } 
    } catch (error) {
        res.status(400).json({
            message: "worng inputs in api request body"
         }) 
    }
    
}

export async function updateVaultValidation(req: Request, res: Response, next: NextFunction) {
    
    try {
        const parsedData = updateVaultZod.safeParse({
            appname: req.body.appname,
            accountId: req.body.accountId,
            password: req.body.password,
            vaultId: req.body.vaultId
        })

            if (parsedData.success===false) throw "worng inputs in api request body"

            const customReq: vaultCustomRequest = req as vaultCustomRequest
                customReq.vaultData = {
                    appname: parsedData.data.appname,
                    accountId: parsedData.data.accountId,
                    password: parsedData.data.password,
                    vaultId: parsedData.data.vaultId
                }
           next()
        
    } catch (error) {
     res.json({
        message: "worng inputs in api request body"
     }).status(400)   
    }
}



// exports.module = {
//     validateUser
// }


