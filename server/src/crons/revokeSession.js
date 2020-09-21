const prisma=require("../db-connect/dbconnect").dbconnect()
var cron=require("node-cron")
exports.cronJob=cron.schedule("* * * * *",async ()=>{
    await prisma.userSessions.findMany({
      select:{
        logged_date:true,
        token:true,
      }
    }).then(async data=>{
      for(let item of data){
        let min=parseInt(Math.abs(new Date()-new Date(item.logged_date))/6e4)
        // console.log(min)
        if(min>45){
          // console.log(item.token+" is deleted")
          await prisma.userSessions.deleteMany({
            where:{
              token:item.token
            }
          })
        }
      }
    })
    await prisma.adminSessions.findMany({
      select:{
        logged_date:true,
        token:true,
      }
    }).then(async data=>{
      for(let item of data){
        let min=parseInt(Math.abs(new Date()-new Date(item.logged_date))/6e4)
        // console.log(min)
        if(min>45){
          // console.log(item.token+" is deleted ")
          await prisma.adminSessions.deleteMany({
            where:{
              token:item.token
            }
          })
        }
      }
    })
})