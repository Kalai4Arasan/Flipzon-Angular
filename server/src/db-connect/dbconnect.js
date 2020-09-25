exports.dbconnect=function (){
    const PrismaClient=require("@prisma/client").PrismaClient
    const prisma=new PrismaClient()
    return prisma
}
exports.redisConnect=function(){
    const redis=require("redis")
    const client=redis.createClient()
    return client
}