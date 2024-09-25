const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); //this allows you to read the data form the body of the POST route
//which is in JSON format


function kidneyMiddleware(req, res, next){
    const kidneyId = req.query.kidneyId;
    if(kidneyId != 1 && kidneyId != 2){
        res.status(411).json({
            msg : "wrong inputs"
        })
    }else{
        next();  //if the inputs are correct the thread will move forward
    }
}

function userMiddleware(req, res, next){
    const userName = req.headers.userName;
    const password = req.headers.password;

    if(userName != "Nakul" && password != "pass"){
        res.status(403).json({
            msg : "Username not found"
        })
    }else{
        next();
    }
}

// app.use(userMiddleware);
//now this is something intersting, when we call this app.use(Middleware_name)
//all the routes written after this uses this middleware by default no need to call them seperately


app.get('/health-check',userMiddleware, kidneyMiddleware, (req, res)=>{
    res.send("You are a healthy preson");
})


app.put('/change-kidney', userMiddleware, kidneyMiddleware, (req, res)=>{
    res.send("Changed to a healthy kidney");
})

app.listen(port);