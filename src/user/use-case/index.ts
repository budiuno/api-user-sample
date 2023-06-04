import {usersDb} from '../data-access'
import makeCreateLogin from './create-login'
import makeValidateAdmin from './create-validate-admin'
import makeValidateMember from './create-validate-member'
import makeGetUsers from './get-data-users'
import makeGetUserById from './get-data-user-by-id'
import makeGetProfile from './get-data-profile'
import makeGetCountMember from './get-data-count-member'
import makeGetCountAdmin from './get-data-count-admin'
import {setUpJwt} from '../helpers'

const createLogin = makeCreateLogin({usersDb, setUpJwt})
const createValidateAdmin = makeValidateAdmin({setUpJwt})
const createValidateMember = makeValidateMember({})
const getUsers = makeGetUsers({usersDb})
const getUserById = makeGetUserById({usersDb})
const getProfile = makeGetProfile({usersDb})
const getCountMember = makeGetCountMember({usersDb})
const getCountAdmin = makeGetCountAdmin({usersDb})

const userService = Object.freeze({
  createLogin,
  createValidateAdmin,
  createValidateMember,
  getUsers,
  getUserById,
  getProfile,
  getCountMember,
  getCountAdmin
})

export default userService
export {createLogin, createValidateAdmin, createValidateMember, getUsers, getUserById, getProfile, getCountMember, getCountAdmin}
