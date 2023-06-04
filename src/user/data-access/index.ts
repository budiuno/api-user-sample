import makeUserDb from './users-db'
import {setUpJwt} from '../helpers'
import mysql from 'mysql'
const {Sequelize} = require('sequelize')
require('dotenv').config();

const environment = process.env.ENVIRONMENT!.toLowerCase()
console.log(environment)

const dbHost = ((environment === 'production') ? process.env.DB_HOST_PROD : process.env.DB_HOST_DEV) 
const dbUser = ((environment === 'production') ? process.env.DB_USER_PROD : process.env.DB_USER_DEV)
const dbPassword = ((environment === 'production') ? process.env.DB_PASS_PROD : process.env.DB_PASS_DEV)
const dbName = ((environment === 'production') ? process.env.DB_DATABASE_PROD : process.env.DB_DATABASE_DEV)

console.log(dbName);

var mysqlConnection = mysql.createPool  ({
  connectionLimit : 10,
  host : dbHost,
  user : dbUser,
  password : dbPassword,
  database : dbName,
  multipleStatements : true
});

var sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName,
  dialect: 'mysql',
  multipleStatements : true,
  //logging: false,
  logging: console.log,

 define: {
   freezeTableName: true, // Do not change my table names.
   timestamps: false
},
 pool: {
   max: 5,
   min: 0,
   idle: 10000
 }, 
});

// var sequelizeSlave = new Sequelize(dbName, dbUser, dbPassword, {
//   host: dbHost,
//   user: dbUser,
//   password: dbPassword,
//   database: dbName,
//   dialect: 'mysql',
//   multipleStatements : true,
//   logging: false,
//  //logging: console.log,

//  define: {
//    freezeTableName: true, // Do not change my table names.
//    timestamps: false
// },
//  pool: {
//    max: 5,
//    min: 0,
//    idle: 10000
//  }, 
// });

const users = sequelize.define('users',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  referral_id:{
    type: Sequelize.STRING
  },
  ip_address:{
    type: Sequelize.STRING
  },
  password:{
    type: Sequelize.STRING
  },
  salt:{
    type: Sequelize.STRING
  },
  email:{
    type: Sequelize.STRING
  },
  activation_code:{
    type: Sequelize.STRING
  },
  forgotten_password_code:{
    type: Sequelize.STRING
  },
  forgotten_password_time:{
    type: Sequelize.INTEGER
  },
  remember_code:{
    type: Sequelize.STRING
  },
  created_on:{
    type: Sequelize.INTEGER    
  },
  last_login:{
    type: Sequelize.INTEGER
  },
  active:{
    type: Sequelize.INTEGER.UNSIGNED
  },
  full_name:{
    type: Sequelize.STRING
  },
  no_ktp:{
    type: Sequelize.STRING
  },
  no_npwp:{
    type: Sequelize.STRING
  },
  ktp_image:{
    type: Sequelize.STRING
  },
  birthdate:{
   type: Sequelize.DATEONLY,
   allowNull: true,
  },
  gender:{
    type: Sequelize.ENUM('pria', 'wanita')
  },
  province_id:{
    type: Sequelize.INTEGER
  },
  city_id:{
    type: Sequelize.INTEGER
  },
  subdistrict_id:{
    type: Sequelize.INTEGER
  },
  zip_code:{
    type: Sequelize.STRING
  },
  address:{
    type: Sequelize.STRING
  },
  phone:{
    type: Sequelize.STRING
  },
  bank_name:{
    type: Sequelize.STRING
  },
  account_name:{
    type: Sequelize.STRING
  },
  rek_no:{
    type: Sequelize.STRING
  },
  membership_plan_id:{
    type: Sequelize.STRING
  },
  membership_updated_time:{
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  referral_from:{
    type: Sequelize.INTEGER
  },
  source:{
    type: Sequelize.ENUM('abdi', 'essenzo')
  },
  source_funnel:{
    type: Sequelize.STRING
  },
  onboard:{
    type: Sequelize.INTEGER
  },
  legal_agreement:{
    type: Sequelize.INTEGER
  },
  updatedAt:{
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
})

const usersGroup = sequelize.define('users_groups', {
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  user_id:{
    type: Sequelize.INTEGER
  },
  group_id:{
    type: Sequelize.INTEGER
  }
})

const userAdminGroup = sequelize.define('users_admin_group',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  user_id:{
    type: Sequelize.INTEGER
  },
  admin_group_id:{
    type: Sequelize.INTEGER
  }
})

const groupAbilities = sequelize.define('group_abilities',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  group_id:{
    type: Sequelize.INTEGER
  },
  subject:{
    type: Sequelize.STRING
  },
  actions:{
    type: Sequelize.ENUM('manage','create','read','update','delete')
  },
  created_time:{
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  updated_time: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
})

const adminGroup = sequelize.define('admin_groups',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  group_name:{
    type: Sequelize.STRING
  },
  description:{
    type: Sequelize.STRING
  }
})

const groups = sequelize.define('groups',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name:{
    type: Sequelize.STRING
  },
  description:{
    type: Sequelize.STRING
  }
})

const membershipPlan = sequelize.define('membership_plan',{
  membership_plan_id:{
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name:{
    type: Sequelize.STRING
  },
  price:{
    type: Sequelize.INTEGER
  },
  net_price:{
    type: Sequelize.INTEGER
  },
  percent_fee:{
    type: Sequelize.INTEGER
  },
  join_cashback:{
    type: Sequelize.INTEGER
  },
  personal_sales_fee:{
    type: Sequelize.INTEGER
  },
  description:{
    type: Sequelize.TEXT
  },

})

const provinces = sequelize.define('provinces',{
  province_id:{
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name:{
    type: Sequelize.STRING
  },
})

const cities = sequelize.define('cities',{
  city_id:{
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  province_id:{
    type: Sequelize.INTEGER
  },
  name:{
    type: Sequelize.STRING
  },
  type:{
    type: Sequelize.STRING
  },
  postal_code:{
    type: Sequelize.STRING
  },
  city_name_jnt:{
    type: Sequelize.STRING
  },
  city_code_jnt:{
    type: Sequelize.STRING
  },
  subdistrict_status:{
    type: Sequelize.ENUM('wait','process','done')
  },
})

const subdistrict = sequelize.define('subdistricts',{
  subdistrict_id:{
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  city_id:{
    type: Sequelize.INTEGER
  },
  province_id:{
    type: Sequelize.INTEGER
  },
  name:{
    type: Sequelize.STRING
  },
  subdistrict_name_jnt:{
    type: Sequelize.STRING
  },
  subdistrict_code_jnt:{
    type: Sequelize.STRING
  },
  subdistrict_name_jne:{
    type: Sequelize.STRING
  },
  subdistrict_code_jne:{
    type: Sequelize.STRING
  },
  subdistrict_name_sicepat:{
    type: Sequelize.STRING
  },
  subdistrict_code_sicepat:{
    type: Sequelize.STRING
  },
  latitude:{
    type: Sequelize.STRING
  },
  longitude:{
    type: Sequelize.STRING
  },
})

const usersDb = makeUserDb({users, usersGroup, userAdminGroup, groupAbilities, adminGroup, groups, membershipPlan,provinces,cities,subdistrict,sequelize,mysqlConnection})
//const userGroupDb = makeUserGroupDb({users_groups})

const dataDb = Object.freeze({
  usersDb
})

export default dataDb
export {usersDb}












