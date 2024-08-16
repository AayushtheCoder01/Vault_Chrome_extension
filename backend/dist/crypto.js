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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptData = encryptData;
exports.decryptData = decryptData;
const crypto_js_1 = __importDefault(require("crypto-js"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
// A secret key (this should be kept secret)
const secretKey = process.env.CRYPTO_KEY;
function encryptData(data) {
    // The message you want to encrypt
    const message = data;
    // Encrypt the message
    const encryptedMessage = crypto_js_1.default.AES.encrypt(message, secretKey).toString();
    // return encryptedMessage
    return encryptedMessage;
}
function decryptData(data) {
    const encryptedMessage = data;
    const bytes = crypto_js_1.default.AES.decrypt(encryptedMessage, secretKey);
    const decryptedMessage = bytes.toString(crypto_js_1.default.enc.Utf8);
    return decryptedMessage;
}
