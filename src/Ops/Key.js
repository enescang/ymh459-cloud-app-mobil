import Aes from 'react-native-aes-crypto';

const generateKey = async (password, salt, cost, length) => {
    const result = await Aes.pbkdf2(password, salt, cost, length)
    return result;
}

const encryptData = async (text, key) => {
    const iv = "aaaaaaaaaaaaaaaa"+"aaaaaaaaaaaaaaaa"
    console.log("IV AES:", {iv})
    const result = await Aes.encrypt(text, key, iv, "aes-256-cbc");
    return {cipher:result, iv:iv};
}

const decryptData = async(encryptedData, key) => {
    console.log(encryptData.cipher)
    const result = await Aes.decrypt(encryptedData.cipher, key, encryptedData.iv, "aes-256-cbc")
    return result;
}

const AES_KEY = {
    generateKey,
    encryptData,
    decryptData
}
export {
    AES_KEY,
}