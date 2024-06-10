// import mongoose from 'mongoose'
// import { DB_NAME } from './constants'
import dotenv from 'dotenv'
import connectDB from './db/index.js'
// require('dotenv').config({path : './env'})
dotenv.config({
    path : './env'
})


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is Running on PORT ${process.env.PORT}`);
        
    }) 
})
.catch((err)=>{
   console.log("MOngo db connection Failed !!",err);

})








// import express from 'express'
// const app = express()

// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error",()=>{
//             console.log("eroor",error);
//             throw error   
//         })
//         app.listen(process.env.PORT, ()=>{
//             console.log(`App islisting on Port ${process.env.PORT}`);
            
//         })
//     } catch (error) {
//         console.error("Error !", error)
//         throw error
//     }
// })()