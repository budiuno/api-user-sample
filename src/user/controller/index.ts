import {
  createLogin,
  createValidateAdmin,
  createValidateMember,
  getUsers,
  getUserById,
  getProfile,
  getCountMember,
  getCountAdmin
} from '../use-case'

import makePostLogin from './post-login'
import makePostValidateAdmin from './post-validate-admin'
import makePostValidateMember from './post-validate-member'
import makeGetDataUsers from './get-users'
import makeGetDataUserById from './get-users-by-id'
import makeGetDataProfile from './get-profile'
import makeGetCountdownlineMember from './get-count-member'
import makeGetCountdownlineAdmin from './get-count-admin'

const postDataLogin = makePostLogin({createLogin})
const postValidateAdminToken = makePostValidateAdmin({createValidateAdmin})
const postValidateMemberToken = makePostValidateMember({createValidateMember})
const getDataUsers = makeGetDataUsers({getUsers})
const getDataUserById = makeGetDataUserById({getUserById})
const getDataProfile = makeGetDataProfile({getProfile})
const getCountdownlineMember = makeGetCountdownlineMember({getCountMember})
const getCountdownlineAdmin = makeGetCountdownlineAdmin({getCountAdmin})

const userController =  Object.freeze({
  postDataLogin,
  postValidateAdminToken,
  postValidateMemberToken,
  getDataUsers,
  getDataUserById,
  getDataProfile,
  getCountdownlineMember,
  getCountdownlineAdmin
})

export default  userController
export {postDataLogin, postValidateAdminToken, postValidateMemberToken, getDataUsers, getDataUserById, getDataProfile, getCountdownlineMember, getCountdownlineAdmin}
