require('dotenv').config()
const express=require("express")
const webPush = require('web-push');
const app=express()


const publicVapidKey = process.env.publicKey;
const privateVapidKey = process.env.privateKey;
console.log(publicVapidKey)
webPush.setVapidDetails("mailto: <kalaisivagi@gmail.com>", publicVapidKey, privateVapidKey);


/* Body parser*/
const bodyparser=require("body-parser")
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

/* CORS Allow */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

/*CronJob */
const crons=require("./crons/revokeSession.js")
crons.cronJob

/* Routes */
const UserRoutes=require("./routes/UserRouter.js")
const AdminRoutes=require("./routes/AdminRouter.js")
app.use("",UserRoutes)
app.use("",AdminRoutes)

/*Listening to the Server*/
let server=app.listen(3000,(err)=>{
  console.log("connected")
})
// exports.serverClose=server.close()
// module.exports = app