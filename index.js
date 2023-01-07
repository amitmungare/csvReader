const express = require('express');
const port = 3000;
const path = require('path');

const app=express();

app.use('/', require('./routes/index'));

app.listen(port, function(error){
    if(error){
        console.log("Error in starting the server", error);
        return;
    }
    console.log(`Srever started on port ${port}`);
})