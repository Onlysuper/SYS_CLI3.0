const CryptoJS = require('crypto-js');  //引用AES源码js

// const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");  //十六位十六进制数作为密钥
// const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');   //十六位十六进制数作为密钥偏移量

//解密方法
function Decrypt(word, key) {
    // let content = "C2G3MPErtTVYfFB0Y1PBj2G5mu/nJrTtV/SoRbJc08lWbMCtRKikFIpg1CMigVLt1k6fuGu/D/TIJfM9Pg5H/oWS3J9nKLSvIpXXVlWEEAcy3SKn6RDEl0+sQzL6jvhemlAMYFC/+bIWd9BNKnJt0w==";
    // let content = "0b61b730f12bb535587c50746353c18f61b99aefe726b4ed57f4a845b25cd3c9566cc0ad44a8a4148a60d423228152edd64e9fb86bbf0ff4c825f33d3e0e47fe8592dc9f6728b4af2295d7565584100732dd22a7e910c4974fac4332fa8ef85e9a500c6050bff9b21677d04d2a726dd3";
    // content = CryptoJS.enc.Hex.parse(content); //  处理后台传回来的
    // content = CryptoJS.enc.Base64.stringify(content);//  处理后台传回来的
    let decryptResult = CryptoJS.AES.decrypt(word, CryptoJS.enc.Utf8.parse(key), {    //  AES解密
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    var decryptedStr = decryptResult.toString(CryptoJS.enc.Utf8);
    return decryptedStr;
}

//加密方法
function Encrypt(word, key) {//word json格式，key字符串
    let content = word;
    var encryptResult = CryptoJS.AES.encrypt(JSON.stringify(content), CryptoJS.enc.Utf8.parse(key), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encryptResult.toString();
}

export default {
    Decrypt,
    Encrypt
}
