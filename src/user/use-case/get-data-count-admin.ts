const environment = process.env.ENVIRONMENT!.toLowerCase()
const secretKeyAdmin = ((environment === 'production') ? process.env.JWT_ADMIN_KEY : process.env.DEV_JWT_ADMIN_KEY)
var jwt = require('jsonwebtoken');
require('dotenv').config();

export default function makeGetCountAdmin({usersDb}){
    return async function getCountAdmin(body){
        try {
            const token = body.bodyparam.key
            var decoded = jwt.verify(token, secretKeyAdmin)

            if(typeof body.bodyparam.key === "undefined" || typeof body.bodyparam.id === "undefined"){
                const ret = {
                    status : false,
                    response_code : 400,
                    message : 'Key/id field is required'
                  }
                return ret
            }
            if(body.bodyparam.key === "" || body.bodyparam.id === "" || body.bodyparam.createdOn === "" || body.bodyparam.key === null || body.bodyparam.id === null || body.bodyparam.createdOn === null){
                const ret = {
                    status : false,
                    response_code : 400,
                    message : 'Key cannot be null'
                  }
                return ret
            }

            const resCount = await usersDb.getCountdownline(body)
            return resCount
        } catch (error) {
            console.log(error);
            const ret = {
                status: false,
                response_code: 400,
                message: error.message   
               }
               return ret   
        }
    }
}