import { resolve } from "path";
import express from 'express';
const jwt = require('jsonwebtoken')
const passportJWT = require("passport-jwt")
const environment = process.env.ENVIRONMENT!.toLowerCase()
const secretKey = ((environment === 'production') ? process.env.JWT_KEY : process.env.DEV_JWT_KEY)
const secretKeyAdmin = ((environment === 'production') ? process.env.JWT_ADMIN_KEY : process.env.DEV_JWT_ADMIN_KEY)
const crypto = require('crypto')
const encode = require('nodejs-base64-encode');
require('dotenv').config();

export default function makeCreateLogin({usersDb, setUpJwt}){
    return async function createLogin(body){
            try {
                if (typeof body.email === "undefined" || typeof body.password === "undefined" ) {
                             const ret = {
                              status : false,
                              response_code : 400,
                              message : 'Email/Password field is required'
                            }
                    return ret
                 }

                if(body.email === "" || body.password === "" || body.email === null || body.password === null){
                    const ret = {
                        status : false,
                        response_code : 400,
                        message : 'Email/Password cannot be null'
                      }
                    
              return ret
                }
                
                const getUser = await usersDb.getUser(body)
                const setToken = await setUpJwt.setUpJwt(body)
                const {email,password} = body
                const validateRes = await usersDb.validateUsername(body);
 
                if(validateRes.status == true){
                    if(getUser.data[0].dataValues.users_groups[0].dataValues.group_id == 2){
                        const token = jwt.sign(setToken.payloadJwt, secretKey)
                        return token
                    }else{
                        const token = jwt.sign(setToken.payloadJwtAdmin, secretKeyAdmin)
                        return token
                    }
                }
                else{
                    const ret = {
                     status: false,
                     response_code: 400,
                     message: 'Email/Password invalid'   
                    }
                    return ret
                }
            } catch (error) {
                const ret = {
                    status: false,
                    response_code: 400,
                    message: 'Email/Password invalid'   
                   }
                   return ret

            }
    }
}