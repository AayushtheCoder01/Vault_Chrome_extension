import { PrismaClient } from '@prisma/client'
import { AsyncLocalStorage } from 'async_hooks'
import { encryptData } from './crypto'


const prisma = new PrismaClient()

export async function createUser(email: string, password: string) {
    try {
        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: password,
                userPrefrences : {
                    create: {
                        emailUpdate : true,
                        theme: "default",
                    }
                },
            },
            select: {
                id: true,
                email: true,
                password: true
            }
        })
        const response = {
            message: "user created",
            status: true,
            userData: {
                userId: newUser.id,
                email: newUser.email
            }
        }
        return response
    } catch (error) {
        return {
            message: "email already exist",
            status:false
        }
    }
   
} 

export async function login(email: string, password: string) {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
            // password: password
        },
        select: {
            email: true,
            id: true,
            password: true,
            vaults: true,
            userPrefrences: {
                select: {
                    theme: true
                }
            }
        }
    })

    const userData = {
        email: user?.email,
        userId: user?.id,
        vaults: user?.vaults,
        userPrefrences: user?.userPrefrences
    }

    if (user!== null) return {userData: userData, status: true, password: user.password}
    if (user===null) return {userData: user, status: false}
    // return user
}

export async function createVault(appname: string, password: string, userId: number, accoundId: string) {
    // const encryptedPassword = encryptData(password)
    try {
       const vault = await prisma.vault.create({
        data: {
            appname: appname,
            accountId: accoundId,
            passowrd: password,
            userId: userId
        }
    }) 
    return {
        message: "vault created successfully",
        status:true
    }
    } catch (error) {
        return {
            message: "vault not create",
            status:false
        }
    }
    
}

export async function deleteVaultFn(vaultId: number) {
    try {
        const vault = await prisma.vault.delete({
            where: {
                id: vaultId
            }
        })   
        if(vault.id) return {status: true}
        else{
            return{status: false}
        }
    } catch (error) {
        return {
            status: false
        }
    }
    
}

export async function updateVault(vaultId: number, appname: string, password: string, accountId: string) {
    // const encryptedPassword = encryptData(password)
    try {

        const updatedVault = await prisma.vault.update({
            where: {
                id: vaultId
            },
            data: {
                appname: appname,
                passowrd: password,
                accountId: accountId,
            }
        })

        return {
            status: true
        }     
    } catch (error) {
        return {
            status: false
    }
    }
   
}