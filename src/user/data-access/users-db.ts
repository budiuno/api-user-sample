import { usersDb } from ".";
import { group } from "console";
import { resolve } from "path";
import moment from "moment"
import mysql from 'mysql'
const {Sequelize} = require('sequelize')
const { Op } = require("sequelize");
// const environment = process.env.ENVIRONMENT!.toLowerCase()
// const secretKey = process.env.JWT_KEY
var jwt = require('jsonwebtoken');
require('dotenv').config();

export default function makeUserDb({users, usersGroup, userAdminGroup, groupAbilities, adminGroup, groups, membershipPlan,provinces,cities,subdistrict,sequelize,mysqlConnection}){
    return Object.freeze({
        validateUsername,
        getUser,
        getAdminAbilities,
        getAdminRole,
        getAllDataUsers,
        getDataUserById,
        getProvinceById,
        getCityById,
        getSubdistrictById,
        getProfileUserMember,
        getProvinceProfileById,
        getCityProfileById,
        getSubdistrictProfileById,
        getCountdownline,
        getCountdownlineMember
    })

    async function getCountdownlineMember(body){
        return new Promise(async function (resolve, reject){
            const token = body.bodyparam.key
            const secretKey = process.env.JWT_KEY
            const environment = process.env.ENVIRONMENT!.toLowerCase()
            var decoded = jwt.verify(token, secretKey)
            const createdOn = body.bodyparam.createdOn
            const createdEnd = body.bodyparam.createdEnd
            let dateResult = moment(createdEnd).add(1, 'd');

            const id = decoded.data.id
            const { QueryTypes } = require('sequelize');
            let where = 'where referral_from = '+id

            if(createdOn != undefined){
                console.log('test 1');
                
                where += ' and from_unixtime(created_on) >= "'+moment(createdOn).format("YYYY-MM-DD")+'"'
            }
            if(createdEnd != undefined){
                console.log('test 2');
        
                where += ' and from_unixtime(created_on) < "'+dateResult.format("YYYY-MM-DD")+'"'
            }
            const connection = mysqlConnection.getConnection(function (error, conn){
                const query = conn.query("SELECT count(*) FROM `users` "+where,(err, rows, field)=>{ 
                    //console.log('query', query.sql);                   
                    if(err){
                      reject(new Error(err))
                    }else{
                      resolve(rows)
                    }
                  })
                })
        })
    }

    async function getCountdownline(body){
        return new Promise(async function(resolve,reject){
            const id = body.bodyparam.id
            const createdOn = body.bodyparam.createdOn
            const createdEnd = body.bodyparam.createdEnd
            let dateResult = moment(createdEnd).add(1, 'd');
            const {QueryTypes} = require('sequelize');
            let where = 'where referral_from = '+id

            if(createdOn != undefined){
                console.log('test 1');
                
                where += ' and from_unixtime(created_on) >= "'+moment(createdOn).format("YYYY-MM-DD")+'"'
            }
            if(createdEnd != undefined){
                console.log('test 2');
        
                where += ' and from_unixtime(created_on) < "'+dateResult.format("YYYY-MM-DD")+'"'
            }
            const connection = mysqlConnection.getConnection(function (error, conn){
            const query = conn.query("SELECT count(*) FROM `users` "+where,(err, rows, field)=>{
               console.log('query',query.sql);               
                if(err){
                  reject(new Error(err))
                }else{
                  resolve(rows)
                }
              })
            })

        })
    }

    async function getSubdistrictProfileById(body){
        return new Promise(async function(resolve,reject){
            const token = body.bodyparam.key
            const secretKey = process.env.JWT_KEY
            const environment = process.env.ENVIRONMENT!.toLowerCase()
            var decoded = jwt.verify(token, secretKey)
            const id = decoded.data.id
            users.findAll({
                where:{id:id}
            }).then(data =>{
                const subdistrictId = data[0].dataValues.subdistrict_id
                subdistrict.findAll({
                    where:{subdistrict_id:subdistrictId}
                }).then(res =>{
                    if(res === "undefined" || res.length === 0){
                        resolve (null)
                    }else{
                        resolve(res[0].dataValues.name)
                    }
                })             
            }).catch(err => {        
                console.log('subdistrictProfile',err);
                reject(new Error(err))  
              });            
        })
    }

    async function getCityProfileById(body){
        return new Promise(async function(resolve,reject){
            const token = body.bodyparam.key
            const secretKey = process.env.JWT_KEY
            const environment = process.env.ENVIRONMENT!.toLowerCase()
            var decoded = jwt.verify(token, secretKey)
            const id = decoded.data.id
            users.findAll({
                where:{id:id}
            }).then(data =>{
                const cityId = data[0].dataValues.province_id
                cities.findAll({
                    where:{city_id:cityId}
                }).then(res =>{
                    if(res === "undefined" || res.length === 0){
                        resolve (null)
                    }else{
                        resolve(res[0].dataValues.name)
                    }
                })
            }).catch(err => {        
                console.log('cityProfileById',err);
                reject(new Error(err))  
              });            
        })
    }
    
    async function getProvinceProfileById(body){
        return new Promise(async function(resolve,reject){
            const token = body.bodyparam.key
            const secretKey = process.env.JWT_KEY
            const environment = process.env.ENVIRONMENT!.toLowerCase()
            var decoded = jwt.verify(token, secretKey)
            const id = decoded.data.id
            users.findAll({
                where:{id:id}
            }).then(data =>{
                const provinceId = data[0].dataValues.province_id
                provinces.findAll({
                    where:{province_id:provinceId}
                }).then(res =>{
                    if(res === "undefined" || res.length === 0){
                        resolve (null)
                    }else{
                        resolve(res[0].dataValues.name)
                    }
                })
            }).catch(err => {        
                console.log('provinceProfileById',err);
                reject(new Error(err))  
              });            
        })
    }

    async function getProfileUserMember(body){
        return new Promise(async function(resolve,reject){
            const token = body.bodyparam.key
            const secretKey = process.env.JWT_KEY
            const environment = process.env.ENVIRONMENT!.toLowerCase()
            var decoded = jwt.verify(token, secretKey)
            const id = decoded.data.id
            users.findAll({
                where:{id:id}
            }).then(data =>{
                const membershipPlanId = data[0].dataValues.membership_plan_id
                membershipPlan.findAll({
                    where: {membership_plan_id:membershipPlanId}
                }).then(res =>{
                    const dataMembershipPlan = res[0].dataValues
                    const dataUserById = data[0].dataValues
                    resolve({dataMembershipPlan,dataUserById})
                })
            }).catch(err => {        
                console.log('errorGetProfileUserMember',err);
                reject(new Error(err))  
              });            
        })
    }

    async function getSubdistrictById(body){
        return new Promise(async function(resolve,reject){
            const id = body.bodyparam.userId            
            users.findAll({
                where:{id:id}
            }).then(data =>{                
                const subdistrictId = data[0].dataValues.subdistrict_id
                subdistrict.findAll({
                    where:{subdistrict_id:subdistrictId}
                }).then(res =>{
                    if(res === "undefined" || res.length === 0){
                        resolve (null)
                    }else{
                        resolve(res[0].dataValues.name)
                    }
                }) 
            }).catch(err => {        
                console.log('subdistrictById',err);
                reject(new Error(err))  
              });        
        })
    }

    async function getCityById(body){
        return new Promise(async function(resolve,reject){
            const id = body.bodyparam.userId
            users.findAll({
                where:{id:id}
            }).then(data =>{
                const cityId = data[0].dataValues.province_id
                cities.findAll({
                    where:{city_id:cityId}
                }).then(res =>{
                    if(res === "undefined" || res.length === 0){
                        resolve (null)
                    }else{
                        resolve(res[0].dataValues.name)
                    }
                })             
            }).catch(err => {        
                console.log('getCityById',err);
                reject(new Error(err))  
              });            
        })
    }

    async function getProvinceById(body){
        return new Promise(async function(resolve,reject){
            const id = body.bodyparam.userId
            users.findAll({
                where:{id:id}
            }).then(data =>{                
                const provinceId = data[0].dataValues.province_id
                provinces.findAll({
                    where:{province_id:provinceId}
                }).then(res =>{
                    if(res === "undefined" || res.length === 0){
                        resolve (null)
                    }else{
                        resolve(res[0].dataValues.name)
                    }
                })                
            }).catch(err => {        
                console.log('errorProvince',err);
                reject(new Error(err))  
              });            
        })
    }

    async function getDataUserById(userId){
        return new Promise(async function(resolve,reject){
            const id = userId.bodyparam.userId
            users.findAll({
                where:{id:id}
            }).then(data =>{
                const membershipPlanId = data[0].dataValues.membership_plan_id
                membershipPlan.findAll({
                    where: {membership_plan_id:membershipPlanId}
                }).then(res =>{
                    const dataMembershipPlan = res[0].dataValues
                    const dataUserById = data[0].dataValues
                    resolve({dataMembershipPlan,dataUserById})
                })
            }).catch(err => {        
                console.log('errorGetDataUserById',err);
                reject(new Error(err))  
              });
        })
    }

    async function getAllDataUsers(body){
        return new Promise(async function(resolve,reject){
            const groupId = body.bodyparam.groupId 
            let offset = body.bodyparam.page
            let limit = body.bodyparam.perpage
            let page = offset-1
            let pagination = page*limit; 
            if(body.bodyparam.page){
                let offset = parseInt(body.bodyparam.page);
                let page = offset-1;
                pagination = page*limit;
              }
              else{
                pagination += 0;
              }           
            const { QueryTypes } = require('sequelize');
            const user = await sequelize.query('SELECT `u`.`id`, `full_name`, `u`.`birthdate`, `u`.`gender`, `u`.`no_ktp`, `u`.`no_npwp`, `u`.`email`,`u`.`referral_from`, `u`.`membership_plan_id`, `u`.`phone`, `p`.`name` as "province", `c`.`name` as "city", `s`.`name`as "subdistrict", `u`.`zip_code`, `u`.`address`, `u`.`bank_name`, `u`.`account_name`, `u`.`rek_no`, `u`.`source`,from_unixtime(u.created_on) as "generate_time", from_unixtime(u.last_login) as "last_login", `u`.`onboard`FROM `users` `u`LEFT JOIN `provinces` `p` ON `p`.`province_id` = `u`.`province_id`LEFT JOIN `cities` `c` ON `c`.`city_id` = `u`.`city_id`LEFT JOIN `subdistricts` `s` ON `s`.`subdistrict_id` = `u`.`subdistrict_id`JOIN `users_groups` `ug` ON `u`.`id` = `ug`.`user_id`WHERE `ug`.`group_id` = '+groupId+' ORDER BY `u`.`id` DESC LIMIT '+limit,{ type: QueryTypes.SELECT })
            .then(data =>{
               resolve(data) 
            }). catch (error =>{
                console.log('err',error)
            })
        })
    }

    async function validateUsername(param){
        return new Promise(function(resolve,reject){
            const username = param.email
            const password = param.password
            const passwordHash = require('password-hash')
            const bcrypt = require("bcryptjs")

              users.findAll({
                where: {
                    email:username
                }
            }).then(data => {
                const hash = data[0].dataValues.password

                bcrypt.compare(password, hash, function(err, isMatch) {
                if (err) {
                    throw err
                } else if (!isMatch) {
                    console.log("Password doesn't match!")
                    resolve({status:false})
                } else {
                    console.log("Password matches!")
                    resolve({status: true})
                }
                })
            }).catch(err => {        
                console.log('errorValidateUsername',err);
                reject(new Error(err))  
              });
            
        })
    }

    async function getUser(param){
        return new Promise (function(resolve,reject){
           users.hasMany(usersGroup, {foreignKey: 'user_id'})
           usersGroup.belongsTo(users, {foreignKey: 'id'})
            const username = param.email
            users.findAll({
                where: {
                    email:username
                }, include: [usersGroup]
            }).then(data =>{
                    const userId = data[0].dataValues.users_groups[0].dataValues.group_id
                    groups.findAll({
                        where:{
                            id:userId
                        },
                    }).then(data2 =>{
                        resolve({data,data2})
                        
                    })
                //}  
            }).catch(err => {
                reject(err)
            })           
        }) 
    }

    async function getAdminAbilities(param){
        return new Promise(function(resolve,reject){
             const username = param.email
             users.findAll({
                 where: {
                     email:username
                 }
             }).then(async data =>{
                const id = data[0].dataValues.id
                const { QueryTypes } = require('sequelize');
                const users = await sequelize.query('SELECT gb.actions,gb.subject FROM `users_admin_group` uag join group_abilities gb on gb.group_id = uag.admin_group_id where uag.user_id = '+id, { type: QueryTypes.SELECT });
                if(users === "undefined" || users.length === 0){
                    resolve (null)
                }else{
                    resolve(users)
                }
             }).catch(err => {
                 reject(err)
             })  
        })
    }
    async function getAdminRole(param){
        return new Promise(function(resolve, reject){
             const username = param.email
             users.findAll({
                 where: {
                     email:username
                 }
             }).then(async data =>{
                 const userId = data[0].dataValues.id
                 const { QueryTypes } = require('sequelize');
                 const adminRole = await sequelize.query('SELECT group_name FROM `admin_groups` ag join users_admin_group uag on ag.id = uag.admin_group_id where uag.user_id ='+userId,{ type: QueryTypes.SELECT })
                 if(adminRole === "undefined" || adminRole.length === 0){
                    resolve(null)
                }else{
                    resolve(adminRole[0].group_name)
                }
             })
        })
    }
}