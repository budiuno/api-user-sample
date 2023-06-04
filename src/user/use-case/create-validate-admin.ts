var jwt = require('jwt-simple')
const environment = process.env.ENVIRONMENT!.toLowerCase()
const secretKeyAdmin = ((environment === 'production') ? process.env.JWT_ADMIN_KEY : process.env.DEV_JWT_ADMIN_KEY)
const crypto = require('crypto')
const encode = require('nodejs-base64-encode')
require('dotenv').config();

export default function makeValidateAdmin({setUpJwt}){
    return async function createValidateAdmin(body){
        return new Promise (function(resolve,reject){
            try {
            const key = body.bodyparam.key
            var token = jwt.decode(key, secretKeyAdmin)
            resolve (token)    
            } catch (error) {
                console.log('err',error);
                resolve({status:false, error})
                
                
            }
            
        })
    }
}