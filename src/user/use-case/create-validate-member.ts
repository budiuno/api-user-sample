var jwt = require('jwt-simple')
const environment = process.env.ENVIRONMENT!.toLowerCase()
const secretKey = ((environment === 'production') ? process.env.JWT_KEY : process.env.DEV_JWT_KEY)
const crypto = require('crypto')
const encode = require('nodejs-base64-encode')
require('dotenv').config();

export default function makeValidateAdmin({}){
    return async function createValidateAdmin(body){
        return new Promise (function(resolve,reject){
            try {
            const key = body.bodyparam.key
            var token = jwt.decode(key, secretKey)
            resolve (token)    
            } catch (error) {
                console.log('err',error);
                resolve({status:false, error})
                
                
            }
            
        })
    }
}