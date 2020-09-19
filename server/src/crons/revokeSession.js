const client=require("../db-connect/dbconnect").dbconnect()
var cron=require("node-cron")
exports.cronJob=cron.schedule("5 * * * *",()=>{
    client.query(`SELECT logged_date,token FROM "UserSessions"`,(err,res)=>{
      for(let item of res.rows){
        let min=parseInt(Math.abs(new Date()-new Date(item.logged_date))/6e4)
        console.log(min)
        if(min>45){
          console.log(item.token+" is deleted because it is "+min-45+" minutes late")
          client.query(`DELETE FROM "UserSessions" WHERE token=$1`,[item.token],(err,result)=>{
          })
        }
      }
    })
    client.query(`SELECT logged_date,token FROM "AdminSessions"`,(err,res)=>{
      for(let item of res.rows){
        let min=parseInt(Math.abs(new Date()-new Date(item.logged_date))/6e4)
        console.log(min)
        if(min>45){
          console.log(item.token+" is deleted because it is "+min-45+" minutes late")
          client.query(`DELETE FROM "AdminSessions" WHERE token=$1`,[item.token],(err,result)=>{
          })
        }
      }
    })
})