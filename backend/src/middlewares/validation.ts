import zod from "zod"

// const updateTodo = zod.object({
//     title: zod.string(),
//     description: zod.string(),
//     category : zod.string().min(0),
//     completed : zod.boolean(),
//     todoId: zod.string()
// })  

export const createUser = zod.object({
    email: zod.string().min(5).email(),
    password: zod.string().min(2)
})

export const createVaultZodS = zod.object({
    appname: zod.string().min(2),
    accountId: zod.string(),
    password: zod.string().min(2),
    userId: zod.number()
})

export const updateVaultZod = zod.object({
    appname: zod.string(),
    accountId: zod.string(),
    password: zod.string(),
    vaultId: zod.number()
})

export const deleteVault  = zod.object({
    vaultId: zod.number()
})

