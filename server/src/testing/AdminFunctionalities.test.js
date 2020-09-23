require('dotenv').config()
const request=require("supertest")
const app=require("../Server")
const jwt=require('jsonwebtoken')

describe("Admin API calls Checking",()=>{
    var token=null
    var id=null
    it("Admin Login Checking",async ()=>{
        let Admin={adminname:"Admin",password:"147147147"}
        const res=await request(app)
                        .post("/adminLogin").send({Admin})  
            expect(res.statusCode).toEqual(200)
            token=res.body[0]
            id=jwt.verify(token,"flipzon").admin_id
    })

    it("Getting Categories...",async()=>{
        const aid=id
        const jwtToken=token
        const res=await request(app).post("/getCategories").send({aid,jwtToken})
        expect(res.statusCode).toEqual(200)
    })

    it("Adding Category...",async()=>{
        const aid=id
        const jwtToken=token
        const Category="New Testing Category"
        const res=await request(app).post("/addCategory").send({Category,aid,jwtToken})
        expect(res.statusCode).toEqual(200)
    })

    it("Getting Brands...",async()=>{
        const aid=id
        const jwtToken=token
        const res=await request(app).post("/getBrands").send({aid,jwtToken})
        expect(res.statusCode).toEqual(200)
    })

    it("Adding Brand...",async()=>{
        const aid=id
        const jwtToken=token
        const Brand={brand:"New Testing Brand",CategoryList:['SmartPhones',"Appliances"]}
        const res=await request(app).post("/addBrand").send({Brand,aid,jwtToken})
        expect(res.statusCode).toEqual(200)
    })

    it("Getting All Products...",async()=>{
        const aid=id
        const jwtToken=token
        const res=await request(app).post("/allProducts").send({aid,jwtToken})
        expect(res.statusCode).toEqual(200)
    })

    it("Getting Total orders by Category...",async()=>{
        const aid=id
        const jwtToken=token
        const cid=2
        const res=await request(app).post("/allOrders").send({cid,aid,jwtToken})
        expect(res.statusCode).toEqual(200)
    })

    it("Adding Dates to the Ordered Products...",async()=>{
        const aid=id
        const jwtToken=token
        const Dates={buyid:20,shipping:"2020.10.10",delivery:"2020.10.30"}
        const res=await request(app).post("/addDates").send({Dates,aid,jwtToken})
        expect(res.statusCode).toEqual(200)
    })



    it("Admin Logout Checking",async ()=>{
        //console.log(token,id)
        const res=await request(app)
                        .post("/adminLogout").send({aid:id,jwtToken:token})  
            expect(res.statusCode).toEqual(200)
    })


    afterAll(async()=>{
        console.log("Server Closing...")
        await app.serverClose
    })
})