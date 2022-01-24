import { Injectable } from '@angular/core';


import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {
    iterationCount: any;
    keySize: number;
    constructor() { }

    getRanDomString(length) {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for (var i = 0; i < length; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }

    getEncryptedValue(value){
        // debugger
        let key="0123456789123456";
        var iv = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
        var salt = CryptoJS.lib.WordArray.random(256/8).toString(CryptoJS.enc.Hex);
       let ciphertext= this.encrypt(salt, iv, key,value);
       let  ciphertextConversion= (iv + "::" + salt + "::" + ciphertext);
       let encyrptedValue = btoa(ciphertextConversion);
       return encyrptedValue;
    }

    getDecryptedValue(val){
        let key="0123456789123456";
        let encryptedVal =atob(val);
        let decyrptedValue = this.decrypt(encryptedVal.split('::')[1], encryptedVal.split('::')[0], key,encryptedVal.split('::')[2]);
        return decyrptedValue;
    }
    
    encrypt(salt, iv, passPhrase, plainText) {
        var key = this.generateKey(salt, passPhrase);
        var encrypted = CryptoJS.AES.encrypt(
            plainText,
            key,
            { iv: CryptoJS.enc.Hex.parse(iv) });
        return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
      }

      decrypt(salt, iv, passPhrase, plainText) {
        var key = this.generateKey(salt, passPhrase);
        var decrypt = CryptoJS.AES.decrypt(
            plainText,
            key,
            { iv: CryptoJS.enc.Hex.parse(iv) }).toString(CryptoJS.enc.Utf8);
        return decrypt;
      }
    
      generateKey(salt, passPhrase) {
        var key = CryptoJS.PBKDF2(
            passPhrase, 
            CryptoJS.enc.Hex.parse(salt),
            { keySize: 4, iterations:1000 });
        return key;
      }
      
}



