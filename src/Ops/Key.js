import Aes from 'react-native-aes-crypto';
import CryptoJS from 'react-native-crypto-js';

const generateKey = async (password, salt, cost, length) => {
    const result = await Aes.pbkdf2(password, salt, cost, length)
    return result;
}

const encryptData = async (text, key) => {
    const iv = "aaaaaaaaaaaaaaaa" + "aaaaaaaaaaaaaaaa"
    console.log("IV AES:", { iv })
    const result = await Aes.encrypt(text, key, iv, "aes-256-cbc");
    return { cipher: result, iv: iv };
}

const decryptData = async (encryptedData, key) => {
    console.log(encryptData.cipher)
    const result = await Aes.decrypt(encryptedData.cipher, key, encryptedData.iv, "aes-256-cbc")
    return result;
}

const AES_KEY = {
    generateKey,
    encryptData,
    decryptData
}

const sec_generateKey = () => {
    return "my_secret_key";
}

const sec_encryptData = (text, key) => {
    let ciphertext = CryptoJS.AES.encrypt(text, key).toString();
    return ciphertext;
}

const sec_decryptData = (ciphertext, key) => {
    let bytes = CryptoJS.AES.decrypt(ciphertext, key);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}

const SECOND_AES = {
    generateKey: sec_generateKey,
    encryptData: sec_encryptData,
    decryptData: sec_decryptData,
}

export {
    AES_KEY,
    SECOND_AES,
}