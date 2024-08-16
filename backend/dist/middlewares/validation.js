"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVault = exports.updateVaultZod = exports.createVaultZodS = exports.createUser = void 0;
const zod_1 = __importDefault(require("zod"));
// const updateTodo = zod.object({
//     title: zod.string(),
//     description: zod.string(),
//     category : zod.string().min(0),
//     completed : zod.boolean(),
//     todoId: zod.string()
// })  
exports.createUser = zod_1.default.object({
    email: zod_1.default.string().min(5).email(),
    password: zod_1.default.string().min(2)
});
exports.createVaultZodS = zod_1.default.object({
    appname: zod_1.default.string().min(2),
    accountId: zod_1.default.string(),
    password: zod_1.default.string().min(2),
    userId: zod_1.default.number()
});
exports.updateVaultZod = zod_1.default.object({
    appname: zod_1.default.string(),
    accountId: zod_1.default.string(),
    password: zod_1.default.string(),
    vaultId: zod_1.default.number()
});
exports.deleteVault = zod_1.default.object({
    vaultId: zod_1.default.number()
});
