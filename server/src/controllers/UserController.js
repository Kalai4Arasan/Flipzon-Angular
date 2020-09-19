

const client=require("../db-connect/dbconnect").dbconnect()
const mainjs=require('../app')
const deleteUserToken=mainjs.deleteUserToken
const jwt=require('jsonwebtoken')
const secretKey="flipzon"

exports.userRegister=(req,res)=>{
    name=req.body.User.name
    email=req.body.User.email
    address=req.body.User.address
    phone=req.body.User.phone
    password=req.body.User.password
  
    client.query(`SELECT * FROM "User" WHERE  (name=$1) OR (email=$2)`,[name,email],(err,result)=>{
          if(err){
            return res.sendStatus(400)
          }   
          if(result.rows.length==0){
            client.query(`INSERT INTO "User"(name,email,address,phone,password) values($1,$2,$3,$4,$5)`,[name,email,address,phone,password],(err,result)=>{
              if(err){
                return res.sendStatus(400)
              }     
              if(result.rowCount>0){
                  token=jwt.sign(req.body.User,secretKey,{expiresIn:2700})
                  client.query(`INSERT INTO "UserSessions" VALUES($1,$2,$3)`,[result.id,token,new Date().toGMTString()],(err,result)=>{
                    if(err){
                      return res.sendStatus(400)
                    }
                    return res.send([token])
                  })
                }
            })
          }
          else{
            return res.send("")
          }
      })
  }

exports.userLogin=(req,res)=>{
    username=req.body.User.username
    password=req.body.User.password
    client.query(`SELECT * FROM "User" WHERE  (name=$1 AND password=$2) OR (email=$1 AND password=$2)`,[username,password],(err,result)=>{
      if(err){
        return res.sendStatus(400)
      }   
      if(result.rows.length==0){
          return res.send([""])
        }
        else{
        token=jwt.sign(result.rows[0],secretKey,{expiresIn:2700})
        client.query(`INSERT INTO "UserSessions" VALUES($1,$2,$3)`,[result.rows[0].id,token,new Date().toGMTString()],(err,result)=>{
          if(err){
            
            return res.sendStatus(400)
          }
          return res.send([token])
        })
      }
    })
}

exports.userLogout=(req,res)=>{
    client.query(`DELETE FROM "UserSessions" WHERE token=$1`,[req.body.jwtToken],(err,result)=>{
      if(err){
        
        return res.send(400)
      }
      return res.send(["Success"])
    })
}

exports.getProducts=(req,res)=>{
    category=req.query.category
    client.query(`SELECT p.pid,p.productname,p.discount,p.rate,p.description,p.rating,c.category,b.brand,p.images FROM "Products" AS p,"Category" AS c,"Brands" AS b WHERE p.cid=c.cid AND p.bid=b.bid AND p.cid=(SELECT cid FROM "Category" WHERE category=$1)`,[category],(err,result)=>{
      // console.log(result)  
      if(err){
          return res.sendStatus(400)
        }  
          if(result.rowCount==0){
            return res.send([])
          }
          return res.send(result.rows)
    })
  }

  exports.getOneProduct=(req,res)=>{
    productname=req.query.productname
    client.query(`SELECT p.pid,p.productname,p.discount,p.rate,p.description,p.rating,c.category,b.brand,p.images FROM "Products" AS p,"Category" AS c,"Brands" AS b WHERE p.cid=c.cid AND p.bid=b.bid AND p.productname=$1`,[productname],(err,result)=>{
          if(err){
            return res.sendStatus(400)
          } 
          if(result.rowCount==0){
            return res.send([])
          }
          return res.send(result.rows)
    })
  }

  const stripe = require('stripe')("sk_test_51HPMbRBBOoJBqOTMje8ZGBb8ouAbQbmC0GVRNBRCL2TxAr2x4shDPRYmCe9iuAWWtHmTK1QuLRPtaTfNqQRxluuG00nHAek81R");
  exports.buyProduct=(req,res)=>{
    uid=req.body.Data.uid
    pid=req.body.Data.pid
    quantity=req.body.Data.quantity
    totalrate=req.body.Data.totalRate
    buyingdate=req.body.Data.buyingdate
    stripe.charges.create({
        amount: parseInt(totalrate),
        currency: 'inr',
        source: req.body.Data.token,
        capture: false,  
    }).then(response => {
        if(response.status=="succeeded"){
          client.query(`INSERT INTO "Buy"(uid,pid,quantity,total_amount,buying_date) VALUES($1,$2,$3,$4,$5)`,[uid,pid,quantity,totalrate,buyingdate],(err,result)=>{
            if(err){
              return res.sendStatus(400)
            } 
            else{
              return res.send([response])
            }
        })
        console.log(response.status)
      }
      else{
        console.log(response.status)
      }
    }).catch(error => {
      console.log(error)
      return res.send([])
    });
}

exports.addToCart=(req,res)=>{
    uid=req.body.Product.uid
    pid=req.body.Product.pid
    //console.log(buyingdate)
    client.query(`SELECT * FROM "Cart" WHERE uid=$1 AND pid=$2`,[uid,pid],(err,result)=>{
        if(err){
          return res.sendStatus(400)
        } 
      if(result.rowCount==0){
        client.query(`INSERT INTO "Cart"(uid,pid) VALUES($1,$2)`,[uid,pid],(err,result)=>{
          if(err){
            return res.sendStatus(400)
          } 
          else{
            return res.send([req.body.Data])
          }
        })
      }
      else{
        return res.send(["Error"])
      }
    })
}

exports.cart=(req,res)=>{
    uid=req.body.User
    client.query(`SELECT a.*,b.*,c.*,d.*,e.* FROM "Cart" AS a,"Products" AS b,"User" AS c,"Category" AS d,"Brands" AS e where a.pid=b.pid AND a.uid=c.id AND a.uid=$1 AND d.cid=b.cid AND e.bid=b.bid`,[uid],(err,result)=>{
      if(err){
        deleteUserToken(req.body.uid)
        return res.sendStatus(400)
      } 
      else{
        return res.send(result.rows)
      }
    })
}

exports.getOrderedProducts=(req,res)=>{
    uid=req.body.User.uid
    status=req.body.User.status
    client.query(`SELECT a.*,b.*,c.*,d.*,e.* FROM "Buy" AS a,"Products" AS b,"User" AS c,"Category" AS d,"Brands" AS e where a.pid=b.pid AND a.uid=c.id AND a.uid=$1 AND a.status=$2 AND d.cid=b.cid AND e.bid=b.bid`,[uid,status],(err,result)=>{
      if(err){
          return res.sendStatus(400)
        } 
      else{
        //console.log(result.rows)
        res.send(result.rows)
      }
    })
}

exports.deleteCart=(req,res)=>{
    cid=req.body.Data.cid
    uid=req.body.Data.uid
    console.log(req.body)
    client.query(`DELETE FROM "Cart" WHERE cart_id=$1`,[cid],(err,result)=>{
      client.query(`SELECT a.*,b.*,c.*,d.*,e.* FROM "Cart" AS a,"Products" AS b,"User" AS c,"Category" AS d,"Brands" AS e where a.pid=b.pid AND a.uid=c.id AND a.uid=$1 AND d.cid=b.cid AND e.bid=b.bid`,[uid],(err,result)=>{
        if(err){
          return res.sendStatus(400)
        } 
        else{
          res.send(result.rows)
        }
      })
    })
}

exports.cartCount=(req,res)=>{
    uid=req.body.User
    client.query(`SELECT * FROM "Cart" WHERE uid=$1`,[uid],(err,result)=>{
      res.send([result.rowCount])
    })
}

exports.cancelProduct=(req,res)=>{
    buyid=req.body.Product.buyid
    client.query(`Update "Buy" SET status=2 where buyid=$1`,[buyid],(err,result)=>{
      if(err){
        deleteUserToken(req.body.uid)
        return res.sendStatus(400)
      } 
      if(!err){
        res.send(['success'])
      }
      else{
        return res.send([])
      }
    })

}

exports.getOfferedProducts=(req,res)=>{
    client.query(`SELECT p.pid,p.productname,p.discount,p.rate,p.description,p.rating,c.category,b.brand,p.images FROM "Products" AS p,"Category" AS c,"Brands" AS b WHERE p.cid=c.cid AND p.bid=b.bid AND p.discount>0`,(err,result)=>{
      if(err){
        deleteUserToken(req.body.uid)
        return res.sendStatus(400)
      }     
      if(result.rowCount==0){
            return res.send([])
          }
          res.send(result.rows)
    })
  }

exports.getReviews=(req,res)=>{
    pid=req.body.Data
    client.query(`SELECT r.*,u.name,u.email FROM "Reviews" AS r,"User" AS u WHERE r.uid=u.id AND pid=$1`,[pid],(err,result)=>{
      if(err){
        return res.sendStatus(400)
      } 
      if(!err){
        //console.log(result.rows)
        return res.send(result.rows)
      }
      else{
        
      }
    })
  }

exports.getAllReviews=(req,res)=>{
    uid=req.body.Data
    // console.log(uid)
    client.query(`SELECT * from "Reviews" WHERE uid=$1`,[uid],(err,result)=>{
      if(err){
        return res.sendStatus(400)
      } 
      if(!err){
        //console.log(result.rows)
        return res.send(result.rows)
      }
      else{
        
      }
    })
  }