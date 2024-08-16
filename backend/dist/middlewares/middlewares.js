"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.validateUser = validateUser;
exports.jwtValidation = jwtValidation;
exports.vaultDataValidaton = vaultDataValidaton;
exports.deleteVaultValidation = deleteVaultValidation;
exports.updateVaultValidation = updateVaultValidation;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const validation_1 = require("./validation");
dotenv.config();
const jwt_key = process.env.JWT_KEY;
function validateUser(req, res, next) {
    const data = validation_1.createUser.safeParse({
        email: req.body.email,
        password: req.body.password
    });
    if (data.success) {
        const customReq = req;
        customReq.userData = data;
        next();
    }
    else {
        res.status(400).json({
            msg: "wrong inputs"
        });
    }
}
function jwtValidation(req, res, next) {
    try {
        const jwt_token = req.headers.authorization;
        const verify = jsonwebtoken_1.default.verify(jwt_token, jwt_key);
        // next()
        const data = validation_1.createUser.safeParse({
            email: verify.email,
            password: verify.password
        });
        if (data.success === false)
            throw "error in data parsing";
        if (data.success) {
            const customReq = req;
            customReq.userData = data;
            next();
        }
    }
    catch (error) {
        res.status(400).json({
            message: "jwt validation failed."
        });
    }
}
function vaultDataValidaton(req, res, next) {
    try {
        const parsedData = validation_1.createVaultZodS.safeParse({
            appname: req.body.appname,
            accountId: req.body.accountId,
            password: req.body.password,
            userId: req.body.userId,
        });
        if (parsedData.success === false)
            throw "wornd inputs in api request body";
        if (parsedData.success) {
            const customReq = req;
            customReq.vaultData = parsedData.data;
            next();
        }
    }
    catch (error) {
        res.status(400).json({
            message: "worng inputs in api request body"
        });
    }
}
function deleteVaultValidation(req, res, next) {
    try {
        const parsedData = validation_1.deleteVault.safeParse({
            vaultId: req.body.vaultId
        });
        if (parsedData.success === false)
            throw "wornd inputs in api request body";
        if (parsedData.success) {
            const customreq = req;
            customreq.vaultId = parsedData.data.vaultId;
            next();
        }
    }
    catch (error) {
        res.status(400).json({
            message: "worng inputs in api request body"
        });
    }
}
function updateVaultValidation(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parsedData = validation_1.updateVaultZod.safeParse({
                appname: req.body.appname,
                accountId: req.body.accountId,
                password: req.body.password,
                vaultId: req.body.vaultId
            });
            if (parsedData.success === false)
                throw "worng inputs in api request body";
            const customReq = req;
            customReq.vaultData = {
                appname: parsedData.data.appname,
                accountId: parsedData.data.accountId,
                password: parsedData.data.password,
                vaultId: parsedData.data.vaultId
            };
            next();
        }
        catch (error) {
            res.json({
                message: "worng inputs in api request body"
            }).status(400);
        }
    });
}
// exports.module = {
//     validateUser
// }
