
const prisma=require("../db-connect/dbconnect").dbconnect()
const mainjs=require('../app')
const deleteAdminToken=mainjs.deleteAdminToken
const jwt=require('jsonwebtoken')
const secretKey=process.env.SECRET_KEY


exports.adminLogin=async(req,res)=>{
    adminname=req.body.Admin.adminname
    password=req.body.Admin.password
    //console.log(req.body)
    await prisma.admin.findMany({
          where:{
              password:password,
              OR:[{admin_name:adminname},{admin_mail:adminname}]
              },
          select:{
              admin_id:true,
              admin_name:true,
              address:true,
              admin_mail:true,
          }
      }).then(async result=>{
        token=jwt.sign(result[0],secretKey,{expiresIn:2700})
        await prisma.adminSessions.create({
          data:{
            aid:result[0].admin_id,
            token:token,
            logged_date:new Date().toGMTString()
          }
        }).catch(err=>{console.log(err);return res.sendStatus(400)})
        return res.send([token])
      }).catch(err=>{console.log(err);return res.sendStatus(400)})
  }

exports.adminLogout=async(req,res)=>{
  await prisma.adminSessions.deleteMany({
    where:{
      token:req.body.jwtToken
    }
  }).then(data=>{return res.send(['Success'])}).catch(err=>{return res.sendStatus(400)})
  }

exports.getCategories=async(req,res)=>{
        await prisma.category.findMany({
          orderBy:{
            cid:"desc"
          }
        }).then(result=>{return res.send(result)}).catch(err=>{console.log(err);return res.sendStatus(400)})
  }

exports.addCategory=async (req,res)=>{
    category=req.body.Category
    await prisma.category.create({
      data:{
        category:category
      }
    }).then(data=>{
      this.getCategories(req,res)
    }).catch(err=>{console.log(err);return res.sendStatus(400)})
      
  }

exports.getBrands=async (req,res)=>{
    await prisma.brands.findMany({
      orderBy:{
        bid:"desc"
      }
    }).then(data=>{return res.send(data)}).catch(err=>{console.log(err);return res.sendStatus(400)})
  }

exports.addBrand=async (req,res)=>{
    categories= req.body.Brand.CategoryList
    brand=req.body.Brand.brand
    // console.log(categories)
    await prisma.brands.create({
      data:{
        brand:brand,
        categories:{set:categories}
      }
    }).then(async data=>{
      await prisma.brands.findMany({
        orderBy:{
          bid:"desc"
        }
      }).then(data=>{return res.send(data)}).catch(err=>{console.log(err);return res.sendStatus(400)})
    }).catch(err=>{console.log(err);return res.sendStatus(400)})
}

exports.allProducts=async (req,res)=>{
    await prisma.products.findMany().then(async data=>{
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
        }).catch(err=>{console.log(err);return res.sendStatus(400)})

        await prisma.brands.findOne({
          where:{
            bid:item.bid
          },
          select:{
            brand:true
          }
        }).then(result=>{
          Object.assign(item,result)
        }).catch(err=>{console.log(err);return res.sendStatus(400)})
      }
      return res.send(data)
    }).catch(err=>{console.log(err);return res.sendStatus(400)})
  }

exports.addNewProduct=async (req,res)=>{
    productname=req.body.productname
    description=req.body.description
    rate=req.body.rate
    rating=req.body.rating
    images=[]
    for(let item of req.files ){
      images.push(item.filename)
    }
  
    await prisma.category.findMany({
      where:{
        category:req.body.category
      },
      select:{
        cid:true
      }
    }).then(async data=>{
      cid=data[0].cid
      await prisma.brands.findMany({
        where:{
          brand:req.body.brand
        },
        select:{
          bid:true
        }
      }).then(async data=>{
        bid=data[0].bid
        await prisma.products.create({
          data:{
              productname:productname,
              description:description,
              rate:parseFloat(rate),
              rating:parseFloat(rating),
              images:{set:images},
              cid:cid,
              bid:bid
          }
        }).then(data=>{return res.send(['Success'])}).catch(err=>{console.log(err);return res.sendStatus(400)})
      })
    }).catch(err=>{console.log(err);return res.sendStatus(400)})
}

exports.allOrders=async (req,res)=>{
    totalData=[]
    cid=req.body.cid
    await prisma.buy.findMany().then(async data=>{
      for(let item of data){
        await prisma.products.findMany({
          where:{
            cid:parseInt(cid),
            pid:item.pid
          }
        }).then(result=>{
          if(result.length>0){
          Object.assign(item,result[0])
          totalData.push(item)
          }
        }).catch(err=>{console.log(err);return res.sendStatus(400)})
      }
      return res.send(totalData)
    }).catch(err=>{console.log(err);return res.sendStatus(400)})
}

exports.addDates=async (req,res)=>{
    buyid=req.body.Dates.buyid
    shipping=new Date(req.body.Dates.shipping).toISOString()
    delivery=new Date(req.body.Dates.delivery).toISOString()
    //console.log(req.body)
    await prisma.buy.update({
      where:{
        buyid:buyid
      },
      data:{
        shiping_date:shipping,
        delivery_date:delivery,
        status:3
      }
    }).then(data=>{return res.send(["Success"])}).catch(err=>{console.log(err);return res.sendStatus(400)})

}