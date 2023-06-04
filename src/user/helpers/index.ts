import slack from './slack';
import {ErrorHandler,handleError} from './error';
import {usersDb} from '../data-access'
import makeCreateJwt from './setup-jwt'

const sendToSlack = slack;
const setUpJwt = makeCreateJwt({usersDb})

const helperServices = Object.freeze({
    sendToSlack,ErrorHandler,handleError, setUpJwt
})

export default helperServices;
export {sendToSlack,ErrorHandler,handleError, setUpJwt}