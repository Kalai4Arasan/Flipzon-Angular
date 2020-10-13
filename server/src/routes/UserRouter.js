const mainjs=require('../app')
const userToken=mainjs.userToken
const UserController=require("../controllers/UserController")


const routes=require("express").Router()
routes.post('/register',UserController.userRegister)
routes.post('/login',UserController.userLogin)
routes.post('/logout',userToken,UserController.userLogout)

routes.get('/getProducts',UserController.getProducts)
routes.get('/getOneProduct',UserController.getOneProduct)
routes.post('/buyproduct',userToken,UserController.buyProduct)
routes.post('/addtocart',userToken,UserController.addToCart)
routes.post('/cart',userToken,UserController.cart)
routes.post('/orderedProducts',userToken,UserController.getOrderedProducts)
routes.post('/deleteCart',userToken,UserController.deleteCart)
routes.post("/getCartCount",userToken,UserController.cartCount)
routes.post("/cancelProduct",userToken,UserController.cancelProduct)
routes.get('/getOfferedProducts',UserController.getOfferedProducts)
routes.post('/getReviews',UserController.getReviews)
routes.post('/allReviews',userToken,UserController.getAllReviews)
routes.post('/addSubscriber',userToken,UserController.addSubscriber)

module.exports=routes
  