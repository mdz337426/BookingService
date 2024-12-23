const express = require('express');
const bodyParser = require('body-parser');
const {PORT,FLIGHT_SERVICE_PATH, REMAINDER_BINDING_KEY} = require('./config/serverConfig');
const apiRoutes = require('./routes/index')
const app = express();
const db = require('./models/index');
const { subscribeMessage, createChannel } = require('./utils/messageQueue');

const setupAndStarttheserver = ()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api', apiRoutes);
    app.listen(PORT,async ()=>{
        console.log(`server started on port ${PORT}`);
       // const channel = await createChannel();
       // await subscribeMessage(channel, undefined, REMAINDER_BINDING_KEY);
        
    })
}

setupAndStarttheserver();

