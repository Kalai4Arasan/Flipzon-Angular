const client=require("./db-connect/dbconnect").dbconnect()
const jwt=require('jsonwebtoken')
const secretKey="flipzon"


/* User Middleware */
exports.deleteUserToken=(uid)=>{
    client.query(`DELETE FROM "UserSessions" WHERE uid=$1`,[uid],(err,result)=>{
    
    })
}
exports.userToken=(req,res,next)=>{
token=req.body.jwtToken
uid=req.body.uid
client.query(`SELECT * FROM "UserSessions" WHERE token=$1 and uid=$2 `,[token,uid],(err,result)=>{
    if(err){
    deleteUserToken(uid)
    return res.sendStatus(400)
    }
    else{
    if(result.rows.length==0){
        deleteUserToken(uid)
        return res.sendStatus(403)
    }
    else{
        jwt.verify(token,secretKey,(err,result)=>{
        if(err){
            deleteUserToken(uid)
            return res.sendStatus(401)
        }
        else{
            next()
        }
        })
    }
    }
})

}


/*Admin Middleware*/
exports.deleteAdminToken=(aid)=>{
  client.query(`DELETE FROM "AdminSessions" WHERE aid=$1`,[aid],(err,result)=>{
  })
}
exports.adminToken=(req,res,next)=>{
  token=req.body.jwtToken
  aid=req.body.aid
  client.query(`SELECT * FROM "AdminSessions" WHERE token=$1 and aid=$2 `,[token,aid],(err,result)=>{
    if(err){
      deleteAdminToken(aid)
      return res.sendStatus(400)
    }
    else{
      if(result.rows.length==0){
        deleteAdminToken(aid)
        return res.sendStatus(403)
      }
      else{
        jwt.verify(token,secretKey,(err,result)=>{
          if(err){
            deleteAdminToken(aid)
            return res.sendStatus(401)
          }
          else{
            next()
          }
        })
      }
    }
  })
}