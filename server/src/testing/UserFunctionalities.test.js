require('dotenv').config()
const request=require("supertest")
const app=require("../Server")
const jwt=require('jsonwebtoken')
const { Server } = require('http')

describe("User Api Calls Checking",()=>{
    var token=null
    var id=null
    it("Login Checking",async ()=>{
        let User={username:"Kalaiyarasan S",password:"123456789"}
        const res=await request(app)
                        .post("/login").send({User})  
            expect(res.statusCode).toEqual(200)
            token=res.body[0]
            id=jwt.verify(token,"flipzon").id
    })
    it("Getting Products Checking...",async()=>{
        const res=await request(app).get("/getProducts").send({category:"SmartPhones"})
        expect(res.statusCode).toEqual(200)
    })

    it("Getting One Product Checking...",async()=>{
        const res=await request(app).get("/getProducts").send({productname:"Redmi 8"})
        expect(res.statusCode).toEqual(200)
    })

    it("Ordering a Product...",async()=>{
        const Data={
            uid:id,
            pid:2,
            quantity:1,
            totalRate:10000,
            buyingdate:"2.12.2020",
            token:"asfasfabDkajdkTKNNNCBjgaggdjas57612512hjrnbv1u2rt12r1gr0",
        }
        const jwtToken=token
        const uid=id
        const res=await request(app).post("/buyproduct").send({Data,jwtToken,uid})
        expect(res.statusCode).toEqual(200)
    })

    it("Adding to Cart...",async ()=>{
        const Product={uid:id,pid:4}
        const jwtToken=token
        const uid=id
        const res=await request(app).post("/addToCart").send({Product,jwtToken,uid})
        expect(res.statusCode).toEqual(200)
    })
    it("Getting products from Cart...",async ()=>{
        const User=id
        const jwtToken=token
        const uid=id
        const res=await request(app).post("/cart").send({User,jwtToken,uid})
        expect(res.statusCode).toEqual(200)
    })

    it("Getting ordered products...",async ()=>{
        const User={uid:id,status:1}
        const jwtToken=token
        const uid=id
        const res=await request(app).post("/orderedProducts").send({User,jwtToken,uid})
        expect(res.statusCode).toEqual(200)
    })

    it("Canceling product from cart...",async ()=>{
        const Data={uid:id,cid:4}
        const jwtToken=token
        const uid=id
        const res=await request(app).post("/deleteCart").send({Data,jwtToken,uid})
        expect(res.statusCode).toEqual(200)
    })
    
    it("Getting cart count...",async ()=>{
        const User=id
        const jwtToken=token
        const uid=id
        const res=await request(app).post("/getCartCount").send({User,jwtToken,uid})
        expect(res.statusCode).toEqual(200)
    })

    it("Canceling product...",async ()=>{
        const Product={buyid:20}
        const jwtToken=token
        const uid=id
        const res=await request(app).post("/cancelProduct").send({Product,jwtToken,uid})
        expect(res.statusCode).toEqual(200)
    })

    it("Getting Offered Products",async ()=>{
        const res=await request(app).get("/getOfferedProducts")
        expect(res.statusCode).toEqual(200)
    })

    it("Get All reviews...",async ()=>{
        const Data=4
        const jwtToken=token
        const uid=id
        const res=await request(app).post("/getReviews").send({Data,jwtToken,uid})
        expect(res.statusCode).toEqual(200)
    })

    it("Get All reviews Made by User Specific...",async ()=>{
        const Data=6
        const jwtToken=token
        const uid=id
        const res=await request(app).post("/allReviews").send({Data,jwtToken,uid})
        expect(res.statusCode).toEqual(200)
    })

    it("Logout Checking",async ()=>{
        //console.log(token,id)
        const res=await request(app)
                        .post("/logout").send({uid:id,jwtToken:token})  
            expect(res.statusCode).toEqual(200)
    })
    afterAll(async()=>{
        console.log("Server Closing...")
        await app.serverClose
    })
})