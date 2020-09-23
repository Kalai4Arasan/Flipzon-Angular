const mainjs=require('../app')
const adminToken=mainjs.adminToken
const AdminController=require("../controllers/AdminController")
const multer=require("multer")
const storage=multer.diskStorage({
  destination:function(req,file,cb){
      cb(null,'../../src/assets/productImages')
  },
  filename:function(req,file,cb){
      cb(null,file.fieldname+"-"+Date.now()+".jpg")
  }
})
var upload=multer({storage:storage})
const routes=require("express").Router()

routes.post('/adminLogin',AdminController.adminLogin)
routes.post('/adminLogout',adminToken,AdminController.adminLogout)

routes.post('/getCategories',adminToken,AdminController.getCategories)
routes.post('/addCategory',adminToken,AdminController.addCategory)
routes.post('/getBrands',adminToken,AdminController.getBrands)
routes.post('/addBrand',adminToken,AdminController.addBrand)
routes.post("/allProducts",adminToken,AdminController.allProducts)
routes.post('/addNewProduct',upload.array('imagesGroup',1),adminToken,AdminController.addNewProduct)
routes.post('/allOrders',adminToken,AdminController.allOrders)
routes.post('/addDates',adminToken,AdminController.addDates)




module.exports=routes