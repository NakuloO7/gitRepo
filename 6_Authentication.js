//Assignment
//Create a website which has 2 endpoints 
//1 - create POST req /singin with username and password
//which returns a json webtoken wiht username encrypted
//2 - creata a GET req /users, which returns an array of all users if the user is signed in(token is correct)
//Return 403 status code if not


const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json());

const ALL_USERS = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];

function userExists(username, password) {
  // write logic to return true or false if this user exists
  // in ALL_USERS array
  //try this using the find func in js

  let userExists = false;
  for(let i = 0; i<ALL_USERS.length; i++){
    if(ALL_USERS[i].username == username && ALL_USERS[i].password == password){
      userExists = true;
    }
  }

  return userExists;
}

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;

    return res.json({
      users : ALL_USERS.filter((i)=>{
        if(i.username === username){
          return false;
        }
        return true;
      })
    });

  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000)




//simple example of jwt 
/*
const jwt = require("jsonwebtoken");

const password = "secret";
//this is the secret password without which we cannot decode the token

let obj = {
  username : "Nakul",
  email : "Nakul@gmail.com"
}

//jwt.sign is used to create a token
let token = jwt.sign(obj,password);
//any one can know the data(decode the jwt) but cannot verify it because of the password which is only know by the backend
console.log(token);


let ans = jwt.verify(token,password);
//this will verifie the token and return the object
//only if the password(secretpassword) is same)
console.log(ans)
let decode = ans.email;

if(decode === obj.email){
  console.log("Jwt verified")
}else{
  console.log("Jwt not verified")
}
*/