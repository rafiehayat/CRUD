const mongoose = require("mongoose")

// mongoose.connect("mongodb://127.0.0.1:27017/testcrud-crud")
// .then(()=>{
//     console.log("Database is connected")
// })
// .catch((err)=>{
//     console.log(err)
// })


// (async function getConnect(){
//     try{
//        await mongoose.connect("mongodb://127.0.0.1:27017/testcrud-crud")
//         console.log("Database is connected")
//     }
//     catch(err){
//         console.log(err)
//     }
// })()

async function getConnect(){
    try{
       await mongoose.connect("mongodb://127.0.0.1:27017/testcrud-crud")
        console.log("Database is connected")
    }
    catch(err){
        console.log(err)
    }
}
getConnect()