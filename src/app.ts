import express from 'express';
import user from './user';



const app = express();

app.use('/user', user);

app.listen(5950,()=> console.log('server run'));
