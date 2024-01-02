const express = require("express")
const path = require("path")
const hbs = require("hbs")
const bodyParser = require("body-parser")

const Employee = require("./models/Employee")
require("./dbConnect")

const encoder = bodyParser.urlencoded()

const app = express()

app.set("view engine", "hbs")
app.use(express.static(path.join(__dirname,"./views/public")))
hbs.registerPartials(path.join(__dirname,"./views/partials"))

app.get("/",async(req,res)=>{
    try {
        let data = await Employee.find().sort({_id:1})
        res.render("index",{data:data})
    } catch (err) {
        console.log(err)
    }
})

app.get("/add",(req,res)=>{
    res.render("add")
})

app.post("/add",encoder,async(req,res)=>{
    try{
        let data = new Employee(req.body)
        await data.save()
        res.redirect("/")
    }
    catch(err){
        console.log(err)
    }
})

app.get("/delete/:_id",async(req,res)=>{
    // to delete record directly from the server
    // try {
    //    await Employee.deleteOne({_id:req.params._id}) 
    //    res.redirect("/")
    // } catch (error) {
    //     console.log(error)
    // }

    //to delete whole record first find everything and delete it
    try {
       let data = await Employee.findOne({_id:req.params._id}) 
       console.log(data)
       await data.deleteOne()
       res.redirect("/")
    } catch (error) {
        console.log(error)
    }
})

app.get("/edit/:_id",async(req,res)=>{
    try {
       let data = await Employee.findOne({_id:req.params._id})
       res.render("edit",{data:data})
    } catch (error) {
        console.log(error)
    }
})

app.post("/edit/:_id",encoder,async(req,res)=>{
    try {
        await Employee.updateOne({_id:req.params._id},req.body)

    //    let data = await Employee.findOne({_id:req.params._id})
    //    data.name = req.body.name
    //    data.email = req.body.email
    //    data.phone = req.body.phone
    //    data.designation = req.body.designation
    //    data.salary = req.body.salary
    //    data.city = req.body.city
    //    data.state = req.body.state
    //    await data.save()
       res.redirect("/")
    } catch (error) {
        console.log(error)
    }
})

app.get("/search",async(req,res)=>{
    try {
       let search = req.query.search
       let data = await Employee.find({
        $or:[
            {name:{$regex:`/*${search}/*`, $options:"i"}},
            {email:{$regex:`/*${search}/*`, $options:"i"}},
            {phone:{$regex:`/*${search}/*`, $options:"i"}},
            {designation:{$regex:`/*${search}/*`, $options:"i"}},
            {city:{$regex:`/*${search}/*`, $options:"i"}},
            {state:{$regex:`/*${search}/*`, $options:"i"}},
        ]
       }) 
       res.render("index", {data:data})
    } catch (error) {
        console.log(error)
    }
})

app.listen(8000,()=>console.log("Server is running at http://localhost:8000"))