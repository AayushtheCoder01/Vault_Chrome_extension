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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("./middlewares/middlewares");
const db_function_1 = require("./db_function");
const cors_1 = __importDefault(require("cors"));
const console_1 = require("console");
const jwt_key = process.env.JWT_KEY;
// const prisma = new PrismaClient()
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/signup", middlewares_1.validateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customReq = req;
    const data = customReq.userData.data;
    const user = yield (0, db_function_1.createUser)(data.email, data.password);
    if (user.status === true) {
        const token = yield createJwt(req.body.email, req.body.password);
        res.status(200).json({
            message: user.message,
            authorization: token,
            userData: user.userData
        });
    }
    if (user.status === false) {
        res.status(400).json({
            message: user.message,
            status: user.status
        });
    }
}));
app.post("/authlogin", middlewares_1.jwtValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const costomReq = req;
    const userCred = costomReq.userData.data;
    try {
        const userLogin = yield (0, db_function_1.login)(userCred.email, userCred.password);
        if (userLogin.status === false)
            throw console_1.error;
        res.json({
            message: "auth login successful",
            userData: userLogin.userData,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "user not found"
        });
    }
}));
app.post("/login", middlewares_1.validateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customReq = req;
    const userCred = customReq.userData.data;
    const userLogin = yield (0, db_function_1.login)(userCred.email, userCred.password);
    try {
        if (userLogin.status === false)
            throw "user not found";
        if (userCred.password === userLogin.password) {
            const token = yield createJwt(req.body.email, req.body.password);
            res.json({
                message: "login successful",
                authorization: token,
                userData: userLogin.userData,
            }).status(200);
        }
        else {
            res.status(400).json({
                message: "wrong password"
            });
        }
    }
    catch (error) {
        res.status(400).json({
            message: "user not found",
            status: false
        });
    }
}));
app.post("/createvault", middlewares_1.jwtValidation, middlewares_1.vaultDataValidaton, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customReqVault = req;
    const vaultData = customReqVault.vaultData;
    let userId = null;
    if (vaultData.userId) {
        userId = vaultData.userId;
    }
    try {
        const newVault = yield (0, db_function_1.createVault)(vaultData.appname, vaultData.password, userId, vaultData.accountId);
        if (newVault.status === false)
            throw newVault.message;
        res.json({
            message: newVault.message
        });
    }
    catch (error) {
        res.json({
            message: "vault not created"
        }).status(400);
    }
}));
app.post("/deletevault", middlewares_1.jwtValidation, middlewares_1.deleteVaultValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customReq = req;
    const vaultId = customReq.vaultId;
    try {
        const deleteProcess = yield (0, db_function_1.deleteVaultFn)(vaultId);
        if (deleteProcess.status === false)
            throw "error occured in delete process";
        res.status(200).json({
            message: "vault deleted successfully"
        });
    }
    catch (error) {
        res.status(400).json({
            message: "vault not deleted"
        });
    }
}));
app.post("/updatevault", middlewares_1.jwtValidation, middlewares_1.updateVaultValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customReq = req;
    const vaultData = customReq.vaultData;
    const vaultId = vaultData.vaultId || 1;
    try {
        const vault = yield (0, db_function_1.updateVault)(vaultId, vaultData.appname, vaultData.password, vaultData.accountId);
        if (vault.status === false)
            throw "vault not updated";
        res.status(200).json({
            message: "vault updated successfully"
        });
    }
    catch (error) {
        res.status(400).json({
            message: "vault not updated"
        });
    }
}));
app.listen(PORT, () => {
    console.log(`backend is running on port ${PORT}`);
});
function createJwt(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = jsonwebtoken_1.default.sign({ email, password }, jwt_key);
        return token;
    });
}
