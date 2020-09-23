const prisma=require("./db-connect/dbconnect").dbconnect()
const jwt=require('jsonwebtoken')
const secretKey=process.env.SECRET_KEY

/* User Middleware */
exports.deleteUserToken=async (uid)=>{
    await prisma.userSessions.deleteMany({
      where:{
        uid:uid
      }
    })
}
exports.userToken=async (req,res,next)=>{
token=req.body.jwtToken
uid=req.body.uid
  await prisma.userSessions.findMany({
    where:{
      AND:[{token:token},{uid:parseInt(uid)}]
    }
  }).then(result=>{
    if(result.length==0){
        this.deleteUserToken(uid)
        return res.sendStatus(403)
    }
    else{
        jwt.verify(token,secretKey,(err,result)=>{
        if(err){
            this.deleteUserToken(uid)
            return res.sendStatus(401)
        }
        else{
            next()
        }
        })
    }
    }
    ).catch()

}


/*Admin Middleware*/
exports.deleteAdminToken=async (aid)=>{
  await prisma.adminSessions.deleteMany({
    where:{
      aid:aid
    }
  })
}
exports.adminToken=async (req,res,next)=>{
  token=req.body.jwtToken
  aid=req.body.aid
    await prisma.adminSessions.findMany({
      where:{
        AND:[{token:token},{aid:parseInt(aid)}]
      }
    }).then(result=>{
      if(result.length==0){
          this.deleteAdminToken(aid)
          return res.sendStatus(403)
      }
      else{
          jwt.verify(token,secretKey,(err,result)=>{
          if(err){
              this.deleteAdminToken(aid)
              return res.sendStatus(401)
          }
          else{
              next()
          }
          })
      }
      }
      )
  
  }