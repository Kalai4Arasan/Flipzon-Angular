const prisma=require("./db-connect/dbconnect").dbconnect()
const client=require("./db-connect/dbconnect").redisConnect()
const {promisify}=require("util")
const getAsync=promisify(client.get).bind(client)
const setAsync=promisify(client.set).bind(client)
const delAsync=promisify(client.del).bind(client)
const jwt=require('jsonwebtoken')
const secretKey=process.env.SECRET_KEY

/* User Middleware */
exports.deleteUserToken=async (uid,token)=>{
    await delAsync(token).then(data=>console.log(data))
    await prisma.userSessions.deleteMany({
      where:{
        uid:parseInt(uid)
      }
    })
}
exports.userToken=async (req,res,next)=>{
token=req.body.jwtToken
uid=req.body.uid
  if(client.get(token)){
      console.log("Getting from Cache")
      jwt.verify(token,secretKey,(err,result)=>{
        if(err){
            this.deleteUserToken(uid,token)
            return res.sendStatus(401)
        }
        else{
            next()
        }
      })
  }
  else{
  console.log("Getting from Postgres")
  await prisma.userSessions.findMany({
    where:{
      AND:[{token:token},{uid:parseInt(uid)}]
    }
  }).then(result=>{
    if(result.length==0){
        this.deleteUserToken(uid,token)
        return res.sendStatus(403)
    }
    else{
        jwt.verify(token,secretKey,async (err,result)=>{
        if(err){
            this.deleteUserToken(uid,token)
            return res.sendStatus(401)
        }
        else{
            await setAsync(token,JSON.stringify(result))
            next()
        }
        })
    }
    }
    ).catch()
  }

}


/*Admin Middleware*/
exports.deleteAdminToken=async (aid,token)=>{
  await delAsync(token).then(data=>console.log(data))
  await prisma.adminSessions.deleteMany({
    where:{
      aid:parseInt(aid)
    }
  })
}
exports.adminToken=async (req,res,next)=>{
  token=req.body.jwtToken
  aid=req.body.aid
    if(client.get(token)){
      console.log("Getting from Admin Cache")
      jwt.verify(token,secretKey,(err,result)=>{
        if(err){
            this.deleteAdminToken(aid,token)
            return res.sendStatus(401)
        }
        else{
            next()
        }
        })
    }
    else{
    //console.log(aid,token)
    await prisma.adminSessions.findMany({
      where:{
        AND:[{token:token},{aid:parseInt(aid)}]
      }
    }).then(result=>{
      if(result.length==0){
          //console.log(result.length,aid,token)
          this.deleteAdminToken(aid,token)
          return res.sendStatus(403)
      }
      else{
        //console.log(result.length,aid,token)
          jwt.verify(token,secretKey,async (err,result)=>{
          if(err){
              this.deleteAdminToken(aid,token)
              return res.sendStatus(401)
          }
          else{
              await setAsync(token,JSON.stringify(result))
              next()
          }
          })
      }
      }
      )
    }
  
  }