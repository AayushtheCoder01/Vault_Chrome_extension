"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.login = login;
exports.createVault = createVault;
exports.deleteVaultFn = deleteVaultFn;
exports.updateVault = updateVault;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newUser = yield prisma.user.create({
                data: {
                    email: email,
                    password: password,
                    userPrefrences: {
                        create: {
                            emailUpdate: true,
                            theme: "default",
                        }
                    },
                },
                select: {
                    id: true,
                    email: true,
                    password: true
                }
            });
            const response = {
                message: "user created",
                status: true,
                userData: {
                    userId: newUser.id,
                    email: newUser.email
                }
            };
            return response;
        }
        catch (error) {
            return {
                message: "email already exist",
                status: false
            };
        }
    });
}
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.findUnique({
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
        });
        const userData = {
            email: user === null || user === void 0 ? void 0 : user.email,
            userId: user === null || user === void 0 ? void 0 : user.id,
            vaults: user === null || user === void 0 ? void 0 : user.vaults,
            userPrefrences: user === null || user === void 0 ? void 0 : user.userPrefrences
        };
        if (user !== null)
            return { userData: userData, status: true, password: user.password };
        if (user === null)
            return { userData: user, status: false };
        // return user
    });
}
function createVault(appname, password, userId, accoundId) {
    return __awaiter(this, void 0, void 0, function* () {
        // const encryptedPassword = encryptData(password)
        try {
            const vault = yield prisma.vault.create({
                data: {
                    appname: appname,
                    accountId: accoundId,
                    passowrd: password,
                    userId: userId
                }
            });
            return {
                message: "vault created successfully",
                status: true
            };
        }
        catch (error) {
            return {
                message: "vault not create",
                status: false
            };
        }
    });
}
function deleteVaultFn(vaultId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vault = yield prisma.vault.delete({
                where: {
                    id: vaultId
                }
            });
            if (vault.id)
                return { status: true };
            else {
                return { status: false };
            }
        }
        catch (error) {
            return {
                status: false
            };
        }
    });
}
function updateVault(vaultId, appname, password, accountId) {
    return __awaiter(this, void 0, void 0, function* () {
        // const encryptedPassword = encryptData(password)
        try {
            const updatedVault = yield prisma.vault.update({
                where: {
                    id: vaultId
                },
                data: {
                    appname: appname,
                    passowrd: password,
                    accountId: accountId,
                }
            });
            return {
                status: true
            };
        }
        catch (error) {
            return {
                status: false
            };
        }
    });
}
