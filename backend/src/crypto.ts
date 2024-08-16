import CryptoJS, { enc } from 'crypto-js';
import * as dotenv from 'dotenv';
dotenv.config();

// A secret key (this should be kept secret)
const secretKey: any = process.env.CRYPTO_KEY;

export function encryptData(data: string) {
    // The message you want to encrypt
    const message: string = data;

    // Encrypt the message
    const encryptedMessage: string = CryptoJS.AES.encrypt(message, secretKey).toString();
    // return encryptedMessage
    return encryptedMessage  
}

export function decryptData(data: string) {
    const encryptedMessage: string = data
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, secretKey);
    const decryptedMessage: string = bytes.toString(CryptoJS.enc.Utf8);
    
    return decryptedMessage
}
