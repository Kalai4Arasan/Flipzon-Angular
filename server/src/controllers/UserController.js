const prisma=require("../db-connect/dbconnect").dbconnect()
const mainjs=require('../app')

const deleteUserToken=mainjs.deleteUserToken
const jwt=require('jsonwebtoken')
const secretKey=process.env.SECRET_KEY


exports.userRegister=async (req,res)=>{
    name=req.body.User.name
    email=req.body.User.email
    address=req.body.User.address
    phone=req.body.User.phone
    password=req.body.User.password
  
    await prisma.user.findMany({
      where:{
        OR:[{name:name},{email:email}]
      }
    }).then(async result=>{
          if(result.length==0){
            await prisma.user.create({
              data:{
                name:name,
                email:email,
                address:address,
                phone:phone,
                password:password
              }
            }).then(async result=>{
              if(result!=null){
                data={
                  "name":name,
                  "email":email,
                  "address":address
                }
                  token=jwt.sign(data,secretKey,{expiresIn:2700})
                  await prisma.userSessions.create({
                    data:{
                      uid:result[0].id,
                      token:token,
                      logged_date:new Date().toGMTString()
                    }
                  }).catch(err=>{return res.sendStatus(400)})
                  return res.send([token])
                }
            })
          }
          else{
            return res.send("")
          }
      })
  }

exports.userLogin=async (req,res)=>{
      username=req.body.User.username
      password=req.body.User.password
      await prisma.user.findMany({
          where:{
              password:password,
              OR:[{name:username},{email:username}]
              },
          select:{
              id:true,
              name:true,
              email:true,
              address:true,
          }
      }).then(async result=>{
        token=jwt.sign(result[0],secretKey,{expiresIn:2700})
        await prisma.userSessions.create({
          data:{
            uid:result[0].id,
            token:token,
            logged_date:new Date().toGMTString()
          }
        }).catch(err=>{console.log(err);return res.sendStatus(400)})
        return res.send([token])
      }).catch(err=>{console.log(err);return res.sendStatus(400)})
      
}

exports.userLogout=async (req,res)=>{
    await prisma.userSessions.deleteMany({
      where:{
        token:req.body.jwtToken
      }
    }).then(data=>{return res.send(['Success'])}).catch(err=>{return res.sendStatus(400)})
}

exports.getProducts=async (req,res)=>{
    categoryData=req.query.category
    totalData=[]
    await prisma.category.findMany({
      where:{
          category:categoryData,
      },
      select:{
          cid:true,
          category:true,
      }
  }).then(async category=>{
    await prisma.products.findMany({
        where:{
            cid:category[0].cid
            }
    }).then(async data=>{
      for(let item of data){
        item.category=category[0].category
        await prisma.brands.findOne({
          where:{
            bid:item.bid
          }
        }).then(result=>{
          if(result!=null){
          item.brand=result.brand
          }
        }).catch(err=>{console.log(err);return res.sendStatus(400)})
      }
      totalData=data
    }).catch(err=>{console.log(err);return res.sendStatus(400)})
  }).catch(err=>{console.log(err);return res.sendStatus(400)})
  return res.send(totalData)
  }

  exports.getOneProduct=async (req,res)=>{
    productname=req.query.productname
    await prisma.products.findMany({
      where:{
        productname:productname,
      }
    }).then(async data=>{
      cid=data[0].cid
      bid=data[0].bid
      await prisma.category.findOne({
        where:{
          cid:cid
        },
        select:{
          category:true
        }
      }).then(category=>{
        data[0].category=category.category
      })
      await prisma.brands.findOne({
        where:{
          bid:bid
        },
        select:{
          brand:true
        }
      }).then(brand=>{
        data[0].brand=brand.brand
      })

      return res.send(data)
    }).catch(err=>{console.log(err);return res.sendStatus(400)})
  }

  const stripe = require('stripe')("sk_test_51HPMbRBBOoJBqOTMje8ZGBb8ouAbQbmC0GVRNBRCL2TxAr2x4shDPRYmCe9iuAWWtHmTK1QuLRPtaTfNqQRxluuG00nHAek81R");
  exports.buyProduct=async (req,res)=>{
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
    }).then(async response => {
        if(response.status=="succeeded"){
            await prisma.buy.create({
              data:{
                uid:uid,
                pid:pid,
                quantity:quantity,
                total_amount:totalrate,
                buying_date:buyingdate
              }
            }).then(data=>{return res.send([response])}).catch(err=>{return res.sendStatus(400)})
      }
      else{
        // console.log(response.status)
        return res.send([response])
      }
    }).catch(error => {
      //console.log(error)
      return res.send([])
    });
}

exports.addToCart=async (req,res)=>{
    uid=req.body.Product.uid
    pid=req.body.Product.pid
    //console.log(buyingdate)
    await prisma.cart.findMany({
      where:{
        uid:uid,
        pid:pid
      }
    }).then(async data=>{
      if(data.length==0){
        await prisma.cart.create({
          data:{
            uid:uid,
            pid:pid
          }
        }).then(data=>{return res.send([req.body.Data])})
      }
      else{
        return res.send(['Error'])
      }
    }).catch(err=>{console.log(err);return res.sendStatus(400)})
}

exports.cart=async (req,res)=>{
    uid=req.body.User
    await prisma.cart.findMany({
      where:{
        uid:uid,
      }
    }).then(async data=>{
      for(let item of data){
        await prisma.user.findOne({
          where:{
            id:item.uid
          }
        }).then(result=>{
          Object.assign(item,result)
        })
  
        await prisma.products.findOne({
          where:{
            pid:item.pid
          }
        }).then(result=>{
          Object.assign(item,result)
        })
  
        await prisma.category.findOne({
          where:{
            cid:item.cid
          },
          select:{
            category:true
          }
        }).then(result=>{
          Object.assign(item,result)
        })
  
        await prisma.brands.findOne({
          where:{
            bid:item.bid
          },
          select:{
            brand:true
          }
        }).then(result=>{
          Object.assign(item,result)
        })
      }
      return res.send(data)
    }).catch(err=>{console.log(err);return res.sendStatus(400)})
}


exports.getOrderedProducts=async (req,res)=>{
    uid=req.body.User.uid
    status=req.body.User.status
    await prisma.buy.findMany({
      where:{
        uid:uid,
        status:status
      }
    }).then(async data=>{
      for(let item of data){
        await prisma.user.findOne({
          where:{
            id:item.uid
          }
        }).then(result=>{
          Object.assign(item,result)
        })
  
        await prisma.products.findOne({
          where:{
            pid:item.pid
          }
        }).then(result=>{
          Object.assign(item,result)
        })
  
        await prisma.category.findOne({
          where:{
            cid:item.cid
          },
          select:{
            category:true
          }
        }).then(result=>{
          Object.assign(item,result)
        })
  
        await prisma.brands.findOne({
          where:{
            bid:item.bid
          },
          select:{
            brand:true
          }
        }).then(result=>{
          Object.assign(item,result)
        })
      }
      return res.send(data)
    }).catch(err=>{console.log(err);return res.sendStatus(400)})
}

exports.deleteCart=async (req,res)=>{
    cid=req.body.Data.cid
    uid=req.body.Data.uid
    //console.log(req.body)
    await prisma.cart.deleteMany({
      where:{
        cart_id:cid
      }
    }).then(data=>{this.cart(req,res)}).catch(err=>{console.log(err);return res.sendStatus(400)})
}

exports.cartCount=async (req,res)=>{
    uid=req.body.User
    await prisma.cart.findMany({
      where:{
        uid:uid
      }
    }).then(data=>{return res.send([data.length])}).catch(err=>{console.log(err);return res.sendStatus(400)})
}

exports.cancelProduct=async(req,res)=>{
    buyid=req.body.Product.buyid
    await prisma.buy.update({
      where:{
        buyid:buyid
      },
      data:{status:2}
    }).then(data=>{return res.send(['success'])}).catch(err=>{console.log(err);return res.sendStatus(400)})
}

exports.getOfferedProducts=async(req,res)=>{
    await prisma.products.findMany({
      where:{
        discount:{gt:0}
      }
    }).then(async data=>{
      for(let item of data){
          await prisma.category.findOne({
            where:{
              cid:item.cid
            },
            select:{
              category:true
            }
          }).then(result=>{
            Object.assign(item,result)
          })

          await prisma.brands.findOne({
            where:{
              bid:item.bid
            },
            select:{
              brand:true
            }
          }).then(result=>{
            Object.assign(item,result)
          })
      }
      return res.send(data)
    }).catch(err=>{console.log(err);return res.sendStatus(400)})
  }

exports.getReviews=async (req,res)=>{
    pid=req.body.Data
    await prisma.reviews.findMany({
      where:{
        pid:pid
      }
    }).then(async data=>{
        for(let item of data){
          await prisma.user.findOne({
            where:{
              id:item.uid
            },
            select:{
              name:true,
              email:true
            }
          }).then(result=>{
            item.name=result.name
            item.email=result.email
          })
        }
        return res.send(data)
    }).catch(err=>{console.log(err);return res.sendStatus(400)})
  }

exports.getAllReviews=async (req,res)=>{
    uid=req.body.Data
    
    await prisma.reviews.findMany({
      where:{
        uid:uid
      }
    }).then(data=>{return res.send(data)}).catch(err=>{console.log(err);return res.sendStatus(400)})
    
  }