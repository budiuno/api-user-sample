const crypto = require('crypto')
const encode = require('nodejs-base64-encode');

export default function makeCreateJwt({usersDb}){
    return Object.freeze({
        setUpJwt
    })
    async function setUpJwt(body){
        return new Promise(async function(resolve,reject){
            try {
                const getUser = await usersDb.getUser(body)
                const abilitiesData = await usersDb.getAdminAbilities(body)
                const roleData = await usersDb.getAdminRole(body)
                
                // #iss
                var os = require('os');
                const hostname = body.host
                //console.log('os',os.hostname[0]);
                
                // #jti
                const hex = crypto.randomBytes(16).toString("hex")
                const encodeBase64 = encode.encode(hex,'base64')

                // #dataToken
                const iat = Math.floor(new Date().getTime()/1000.0)
                const jti = encodeBase64
                const iss = hostname
                const aud = null
                const nbf = iat
                const exp = nbf + 14400
    
                const id = getUser.data[0].dataValues.id
                const onboard = getUser.data[0].dataValues.onboard
                const gender = getUser.data[0].dataValues.gender
                const birthdate = getUser.data[0].dataValues.birthdate
                const subdistrict_id = getUser.data[0].dataValues.subdistrict_id
                const name = getUser.data[0].dataValues.full_name
                const email = getUser.data[0].dataValues.email
                const groups = getUser.data2[0].dataValues
                const abilities = abilitiesData
                const role = roleData
                
                const membershipPlanId = getUser.data[0].dataValues.membership_plan_id
                const referralFrom = getUser.data[0].dataValues.referral_from
    
                const data = {id,onboard, gender, birthdate, subdistrict_id, name, email, groups, abilities, role, membershipPlanId, referralFrom}
    
    
    
                const payloadJwt = {iat, jti, iss, aud, nbf, exp, data}
                const payloadJwtAdmin = {iat, jti, iss, aud, nbf, exp, data}

                resolve ({payloadJwt, payloadJwtAdmin})
            } catch (error) {
                
            }
        })
    }
}