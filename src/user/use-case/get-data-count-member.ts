const environment = process.env.ENVIRONMENT!.toLowerCase()
const secretKey = ((environment === 'production') ? process.env.JWT_KEY : process.env.DEV_JWT_KEY)
var jwt = require('jsonwebtoken');
require('dotenv').config();

export default function makeGetCountMember({usersDb}){
    return async function getCountMember(body){
        try {
            const token = body.bodyparam.key
            var decoded = jwt.verify(token, secretKey)

            if(typeof body.bodyparam.key === "undefined"){
                const ret = {
                    status : false,
                    response_code : 400,
                    message : 'Key/id field is required'
                  }
                return ret
            }
            if(body.bodyparam.key === "" || body.bodyparam.createdOn === "" || body.bodyparam.key === null || body.bodyparam.createdOn === null){
                const ret = {
                    status : false,
                    response_code : 400,
                    message : 'Key cannot be null'
                  }
                return ret
            }

            const resCount = await usersDb.getCountdownlineMember(body)
            return resCount
        } catch (error) {
            console.log('err',error);
            const ret = {
                status: false,
                response_code: 400,
                message: error.message   
               }
               return ret   
        }
    }
}