
const client=require("../db-connect/dbconnect").dbconnect()
const mainjs=require('../app')
const deleteAdminToken=mainjs.deleteAdminToken
const jwt=require('jsonwebtoken')
const secretKey="flipzon"

exports.adminLogin=(req,res)=>{
    adminname=req.body.Admin.adminname
    password=req.body.Admin.password
    //console.log(req.body)
    client.query(`SELECT * FROM "Admin" WHERE  (admin_name=$1 AND password=$2) OR (admin_mail=$1 AND password=$2)`,[adminname,password],(err,result)=>{
      if(err){
        return res.sendStatus(400)
      }   
      if(result.rows.length==0){
          return res.send([""])
        }
        token=jwt.sign(result.rows[0],secretKey,{expiresIn:2700})
          client.query(`INSERT INTO "AdminSessions" VALUES($1,$2,$3)`,[result.rows[0].admin_id,token,new Date().toGMTString()],(err,result)=>{
            if(err){
              console.log(err)
              return res.sendStatus(400)
            }
            return res.send([token])
          })
    })
  }

exports.adminLogout=(req,res)=>{
    client.query(`DELETE FROM "AdminSessions" WHERE token=$1`,[req.body.jwtToken],(err,result)=>{
      if(err){
        deleteAdminToken(req.body.aid)
        return res.send(400)
      }
      return res.send(["Success"])
    })
  }

exports.getCategories=(req,res)=>{
    client.query(`SELECT * FROM "Category"`,(err,result)=>{
      if(err){
        return res.sendStatus(400)
      } 
      if(!err){
        return res.send(result.rows)
      }
      else{
        return res.send([])
      }
    })
  }

exports.addCategory=(req,res)=>{
    category=req.body.Category
          client.query(`INSERT INTO "Category"(category) VALUES($1)`,[category],(err,result)=>{
            if(err){
              deleteAdminToken(req.body.aid)
              return res.sendStatus(400)
            } 
            if(!err){
              client.query(`SELECT * FROM "Category"`,(err,result)=>{
                if(err){
                  deleteAdminToken(req.body.aid)
                  return res.sendStatus(400)
                } 
                if(!err){
                  return res.send(result.rows)
                }
                else{
                  return res.send([])
                }
              })
            }
            else{
              
            }
          })
  }

exports.getBrands=(req,res)=>{
    client.query(`SELECT b.bid,b.brand,c.category FROM "Brands" AS b ,"Category" AS c WHERE c.category=ANY(b.categories::text[]) ORDER BY b.bid DESC`,(err,result)=>{
      if(err){
        deleteAdminToken(req.body.aid)
        return res.sendStatus(400)
      } 
      if(!err){
        return res.send(result.rows)
      }
      else{
        return res.send([])
      }
    })
  }

exports.addBrand=(req,res)=>{
    categories="{"
    for (let i=0;i<req.body.Brand.CategoryList.length;i++){
        if(i==req.body.Brand.CategoryList.length-1){
          categories+=req.body.Brand.CategoryList[i]
        }
        else{
          categories+=req.body.Brand.CategoryList[i]+","
        }
    }
    categories+="}"
    brand=req.body.Brand.brand
    console.log(categories)
    client.query(`INSERT INTO "Brands"(brand,categories) VALUES($1,$2)`,[brand,categories],(err,result)=>{
      if(err){
        deleteAdminToken(req.body.aid)
        return res.sendStatus(400)
      } 
      if(!err){
        client.query(`SELECT b.brand,c.category FROM "Brands" AS b ,"Category" AS c WHERE c.category=ANY(b.categories::text[]) ORDER BY b.bid DESC`,(err,result)=>{
          if(err){
            deleteAdminToken(req.body.aid)
            return res.sendStatus(400)
          } 
          if(!err){
            //console.log(result.rows)
            return res.send(result.rows)
          }
          else{
            return res.send([])
          }
        })
      }
      else{
        
      }
    })
}

exports.allProducts=(req,res)=>{
    client.query(`SELECT p.pid,p.productname,p.discount,p.rate,p.description,p.rating,c.category,b.brand,p.images,c.cid,b.bid FROM "Products" AS p,"Category" AS c,"Brands" AS b WHERE p.cid=c.cid AND p.bid=b.bid AND p.cid in (SELECT cid FROM "Category") ORDER BY p.pid DESC`,(err,result)=>{
      if(err){
        deleteAdminToken(req.body.aid)
        return res.sendStatus(400)
      } 
      if(result.rowCount==0){
        return res.send([])
      }
      res.send(result.rows)
    })
  }

exports.addNewProduct=(req,res)=>{
    productname=req.body.productname
    description=req.body.description
    rate=req.body.rate
    rating=req.body.rating
    images="{"
    for (let i=0;i<req.files.length;i++){
        if(i==req.files.length-1){
          images+=req.files[i].filename
        }
        else{
          images+=req.files[i].filename+","
        }
    }
    images+="}"
    client.query(`SELECT cid FROM "Category" WHERE category=$1`,[req.body.category],(err,result)=>{
      if(err){
        deleteAdminToken(req.body.aid)
        return res.sendStatus(400)
      } 
      category=result.rows[0].cid
      client.query(`SELECT bid FROM "Brands" WHERE brand=$1`,[req.body.brand],(err,result)=>{
        brand=result.rows[0].bid
        if(err){
          deleteAdminToken(req.body.aid)
          return res.sendStatus(400)
        } 
      client.query(`INSERT INTO "Products" (productname,bid,cid,description,rate,images,rating) VALUES($1,$2,$3,$4,$5,$6,$7)`,[productname,brand,category,description,rate,images,rating],(err,result)=>{
        if(err){
          deleteAdminToken(req.body.aid)
          return res.sendStatus(400)
        }   
        if(!err){
            return res.send(['Success'])
          }
        })
      })
    })
}

exports.allOrders=(req,res)=>{
    cid=req.body.cid
    client.query(`SELECT a.*,b.*,c.*,d.*,e.* FROM "Buy" AS a,"Products" AS b,"User" AS c,"Category" AS d,"Brands" AS e where a.pid=b.pid AND d.cid=b.cid AND c.id=a.uid AND e.bid=b.bid AND b.cid=$1`,[cid],(err,result)=>{
      if(err){
          console.log(err)
          deleteAdminToken(req.body.aid)
          return res.sendStatus(400)
        } 
      else{
        //console.log(result.rows)
        return res.send(result.rows)
      }
    })
}

exports.addDates=(req,res)=>{
    buyid=req.body.Dates.buyid
    shipping=req.body.Dates.shipping
    delivery=req.body.Dates.delivery
    //console.log(req.body)
    client.query(`UPDATE "Buy" SET shiping_date=$1 , delivery_date=$2, status=3 WHERE buyid=$3 `,[shipping,delivery,buyid],(err,result)=>{
      if(err){
        deleteUserToken(req.body.uid)
        return res.sendStatus(400)
      } 
      if(!err){
        return res.send(["Success"])
      }
      else{
        
      }
    })

}