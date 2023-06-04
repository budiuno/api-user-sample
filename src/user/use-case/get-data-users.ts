const environment = process.env.ENVIRONMENT!.toLowerCase()
const secretKeyAdmin = ((environment === 'production') ? process.env.JWT_ADMIN_KEY : process.env.DEV_JWT_ADMIN_KEY)
var jwt = require('jsonwebtoken');
require('dotenv').config();

export default function makeGetUsers({usersDb}){
    return async function getUsers(body){   
        try {
            const token = body.bodyparam.key
            var decoded = jwt.verify(token, secretKeyAdmin)
            if(typeof body.bodyparam.key === "undefined" || typeof body.bodyparam.page === "undefined" || typeof body.bodyparam.perpage === "undefined"|| typeof body.bodyparam.groupId === "undefined"){
                const ret = {
                    status : false,
                    response_code : 400,
                    message : 'Key/Page/Perpage/GroupId field is required'
                  }
                return ret
            }
            if (body.bodyparam.key === null || body.bodyparam.page === null || body.bodyparam.perpage === null|| body.bodyparam.groupId === null ||
                body.bodyparam.key === "" || body.bodyparam.page === "" || body.bodyparam.perpage === ""|| body.bodyparam.groupId === "") {
                const ret = {
                    status : false,
                    response_code : 400,
                    message : 'Key/Page/Perpage/GroupId cannot be null'
                  }
                return ret
            }

            const dataUsers = await usersDb.getAllDataUsers(body)
            return (dataUsers)
        } catch (error) {
            const ret = {
                status: false,
                response_code: 400,
                message: error.message   
               }
               return ret
        }
    }
}