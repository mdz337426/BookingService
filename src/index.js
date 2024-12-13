const express = require('express');


const app = express();

const setupAndStarttheserver = ()=>{
    app.listen(3000, (req, res)=>{
        console.log("server started on port 3000");
    })
}


setupAndStarttheserver();

