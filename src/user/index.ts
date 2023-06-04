import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import camelcaseKeys from 'camelcase-keys'

import {postDataLogin, postValidateAdminToken, postValidateMemberToken, getDataUsers, getDataUserById, getDataProfile, getCountdownlineMember, getCountdownlineAdmin} from './controller'

const app = express();
const makeCallback = require ('./call-back')


app.use(cors());
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/login', makeCallback(postDataLogin,camelcaseKeys))
app.post('/validateAdminToken', makeCallback(postValidateAdminToken,camelcaseKeys))
app.post('/validateMemberToken', makeCallback(postValidateMemberToken,camelcaseKeys))
app.post('/users', makeCallback(getDataUsers,camelcaseKeys))
app.post('/usersById', makeCallback(getDataUserById,camelcaseKeys))
app.post('/profile',makeCallback(getDataProfile,camelcaseKeys))
app.post('/countdownlineMember', makeCallback(getCountdownlineMember,camelcaseKeys))
app.post('/countdownlineAdmin', makeCallback(getCountdownlineAdmin,camelcaseKeys))


app.get('/healthcheck',function(req,res){
    res.send();
})

// app.use((err, req, res, next) => {
//     handleError(err, res);
// });




export default app;
