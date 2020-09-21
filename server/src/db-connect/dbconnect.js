exports.dbconnect=function (){
    const PrismaClient=require("@prisma/client").PrismaClient
    const prisma=new PrismaClient()
    return prisma
}