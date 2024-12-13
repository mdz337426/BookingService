const express = require('express');
const {PORT} = require('./config/serverConfig')

const app = express();

const setupAndStarttheserver = ()=>{
    app.listen(PORT, (req, res)=>{
        console.log(`server started on port ${PORT}`);
    })
}

setupAndStarttheserver();

