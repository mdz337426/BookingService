const express = require('express');
const bodyParser = require('body-parser');
const {PORT,FLIGHT_SERVICE_PATH} = require('./config/serverConfig');
const apiRoutes = require('./routes/index')
const app = express();
const db = require('./models/index');

const setupAndStarttheserver = ()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api', apiRoutes);
    app.listen(PORT, ()=>{
        console.log(`server started on port ${PORT}`);
        
    })
}

setupAndStarttheserver();

