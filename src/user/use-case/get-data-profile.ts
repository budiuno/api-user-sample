const environment = process.env.ENVIRONMENT!.toLowerCase()
const secretKey = ((environment === 'production') ? process.env.JWT_KEY : process.env.DEV_JWT_KEY)
var jwt = require('jsonwebtoken');
require('dotenv').config();

export default function makeGetProfile({usersDb}){
    return async function getProfile(body){
        try {
            
            const token = body.bodyparam.key
            var decoded = jwt.verify(token, secretKey)
            
            if(typeof body.bodyparam.key === "undefined"){
                const ret = {
                    status : false,
                    response_code : 400,
                    message : 'Key field is required'
                  }
                return ret
            }
            if(body.bodyparam.key === ""){
                const ret = {
                    status : false,
                    response_code : 400,
                    message : 'Key cannot be null'
                  }
                return ret
            }

            const dataProfile = await setupData(body)
            return dataProfile
            
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

    async function setupData(body){
        try {
            const setupData = await usersDb.getProfileUserMember(body)            
            const provinceName = await usersDb.getProvinceProfileById(body)
            const cityName = await usersDb.getCityProfileById(body)
            const subdistrictName = await usersDb.getSubdistrictProfileById(body)

            //Membership-plan
            const memberShipPlanId = setupData.dataMembershipPlan.membership_plan_id
            const name = setupData.dataMembershipPlan.name
            const price = setupData.dataMembershipPlan.price
            const netPrice = setupData.dataMembershipPlan.net_price
            const percentFee = setupData.dataMembershipPlan.percent_fee
            const joinCashback = setupData.dataMembershipPlan.join_cashback
            const personalSalesFee = setupData.dataMembershipPlan.personal_sales_fee
            const description = setupData.dataMembershipPlan.description

            //set-data
            const id = setupData.dataUserById.id
            const email = setupData.dataUserById.email
            const fullName = setupData.dataUserById.full_name
            const noKtp = setupData.dataUserById.no_ktp
            const noNpwp = setupData.dataUserById.no_npwp
            const ktpImage = setupData.dataUserById.ktp_image
            const gender = setupData.dataUserById.gender
            const birthdate = setupData.dataUserById.birthdate
            const province = provinceName
            const provinceId = setupData.dataUserById.province_id
            const cityId = setupData.dataUserById.city_id
            const city = cityName
            const subdistrictId = setupData.dataUserById.subdistrict_id
            const subdistrict = subdistrictName
            const zipCode = setupData.dataUserById.zip_code
            const address = setupData.dataUserById.address
            const phone = setupData.dataUserById.phone
            const bankName = setupData.dataUserById.bank_name
            const accountName = setupData.dataUserById.account_name
            const rekNo = setupData.dataUserById.rek_no
            const referralFrom = setupData.dataUserById.referral_from
            const referralId = setupData.dataUserById.referral_id
            const membershipPlan = {
                memberShipPlanId,
                name,
                price,
                netPrice,
                percentFee,
                joinCashback,
                personalSalesFee,
                description
             }
            const onboard = setupData.dataUserById.onboard
            

            const data = {id,email,fullName,noKtp,noNpwp,ktpImage,gender,birthdate,provinceId,cityId,city,subdistrictId,
                           subdistrict,zipCode,address,phone,bankName,accountName,rekNo,referralFrom,referralId,membershipPlan,onboard}
    
            return data
            
        } catch (error) {
            
        }
    }
}