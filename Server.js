const express=require("express")
const app=express()
const bodyparser=require('body-parser')

const multer=require('multer')


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/assets/productImages')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'.jpg')
  }
})
 
var upload = multer({ storage: storage })

const jwt=require('jsonwebtoken')
const secretKey="flipzon"
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


const { Client } = require('pg')
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'kalai',
  database:'flipzon'
})

var cron=require("node-cron")
cron.schedule("* * * * *",()=>{
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
        if(min>45){
          console.log(item.token+" is deleted because it is "+min-45+" minutes late")
          client.query(`DELETE FROM "AdminSessions" WHERE token=$1`,[item.token],(err,result)=>{
          })
        }
      }
    })
})





client.connect().then(()=>{console.log("Successfully connected")}).catch((e)=>{console.log(e)})

//client.query(`SELECT id, name, email, address, phone, password FROM "User"`).then((r)=>console.log(r.rows))
app.post('/register',(req,res)=>{
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
                token=jwt.sign(req.body.User,secretKey)
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

})

app.post('/login',(req,res)=>{
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
})

// function checkToken(req,res,next){
//     const Header=req.headers['authorization']
//     console.log(req.headers)
//     next()
// }

app.post('/logout',userToken,(req,res)=>{
    client.query(`DELETE FROM "UserSessions" WHERE token=$1`,[req.body.jwtToken],(err,result)=>{
      if(err){
        
        return res.send(400)
      }
      return res.send(["Success"])
    })
})


// client.query(`SELECT p.pid,p.productname,p.rate,p.description,p.rating,c.category,b.brand FROM "Products" AS p,"Category" AS c,"Brands" AS b WHERE p.cid=c.cid AND p.bid=b.bid AND p.cid=(SELECT cid FROM "Category" WHERE category=$1)`,["SmartPhones"],(err,result)=>{
//   console.log(result.rows)
// })


app.get('/getProducts',(req,res)=>{
  category=req.query.category
  client.query(`SELECT p.pid,p.productname,p.discount,p.rate,p.description,p.rating,c.category,b.brand,p.images FROM "Products" AS p,"Category" AS c,"Brands" AS b WHERE p.cid=c.cid AND p.bid=b.bid AND p.cid=(SELECT cid FROM "Category" WHERE category=$1)`,[category],(err,result)=>{
      if(err){
        return res.sendStatus(400)
      }  
        if(result.rowCount==0){
          return res.send([])
        }
        res.send(result.rows)
  })
})

app.get('/getOneProduct',(req,res)=>{
  productname=req.query.productname
  client.query(`SELECT p.pid,p.productname,p.discount,p.rate,p.description,p.rating,c.category,b.brand,p.images FROM "Products" AS p,"Category" AS c,"Brands" AS b WHERE p.cid=c.cid AND p.bid=b.bid AND p.productname=$1`,[productname],(err,result)=>{
        if(err){
          return res.sendStatus(400)
        } 
        if(result.rowCount==0){
          return res.send([])
        }
        res.send(result.rows)
  })
})


const stripe = require('stripe')("sk_test_51HPMbRBBOoJBqOTMje8ZGBb8ouAbQbmC0GVRNBRCL2TxAr2x4shDPRYmCe9iuAWWtHmTK1QuLRPtaTfNqQRxluuG00nHAek81R");
app.post('/buyproduct',userToken,(req,res)=>{
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
})

app.post('/addtocart',userToken,(req,res)=>{
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
  
  // return res.send([req.body.Data])
})

app.post('/cart',userToken,(req,res)=>{
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
})

app.post('/orderedProducts',userToken,(req,res)=>{
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
})

app.post('/deleteCart',userToken,(req,res)=>{
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
})

app.post("/getCartCount",userToken,(req,res)=>{
    uid=req.body.User
    client.query(`SELECT * FROM "Cart" WHERE uid=$1`,[uid],(err,result)=>{
      res.send([result.rowCount])
    })
})

app.post("/cancelProduct",userToken,(req,res)=>{
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
  
})



app.get('/getOfferedProducts',(req,res)=>{
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
})

function deleteUserToken(uid){
    client.query(`DELETE FROM "UserSessions" WHERE uid=$1`,[uid],(err,result)=>{
      
    })
}

function userToken(req,res,next){
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

// app.post('/addReview',(req,res)=>{
//   pid=req.body.Review.pid
//   uid=req.body.Review.uid
//   review=req.body.Review.review

// })


app.post('/adminLogin',(req,res)=>{
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
})

app.post('/adminLogout',adminToken,(req,res)=>{
  client.query(`DELETE FROM "AdminSessions" WHERE token=$1`,[req.body.jwtToken],(err,result)=>{
    if(err){
      deleteAdminToken(req.body.aid)
      return res.send(400)
    }
    return res.send(["Success"])
  })
})

app.post('/getCategories',adminToken,(req,res)=>{
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
})

app.post('/addCategory',adminToken,(req,res)=>{
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
})

app.post('/getBrands',adminToken,(req,res)=>{
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
})


app.post('/addBrand',adminToken,(req,res)=>{
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
})


app.post("/allProducts",adminToken,(req,res)=>{
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
})

app.post('/addNewProduct',upload.array('imagesGroup',12),adminToken,(req,res)=>{
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
})

app.post('/allOrders',adminToken,(req,res)=>{
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
})

app.post('/addDates',userToken,(req,res)=>{
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
  
})

app.post('/addReview',userToken,(req,res)=>{
        uid=req.body.Data.uid
        pid=req.body.Data.pid
        buyid=req.body.Data.buyid
        rating=req.body.Data.rating
        review=req.body.Data.review

        date=new Date()
        client.query(`INSERT INTO "Reviews"(buyid,uid,pid,rating,review,uploaded_date) VALUES($1,$2,$3,$4,$5,$6)`,[buyid,uid,pid,rating,review,date],(err,result)=>{
          if(err){
            deleteUserToken(req.body.uid)
            return res.sendStatus(400)
          } 
          if(!err){
            return res.send(['Success'])
          }
          else{
            
          }
        })
})

app.post('/getReviews',(req,res)=>{
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
})

app.post('/allReviews',userToken,(req,res)=>{
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
})

function deleteAdminToken(aid){
  client.query(`DELETE FROM "AdminSessions" WHERE aid=$1`,[aid],(err,result)=>{
  })
}

function adminToken(req,res,next){
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



app.listen(process.env.PORT|3000,(err)=>{
    console.log("Connected to the server...",process.env.PORT|3000)
})





