const express = require('express')
const app = express()
const bodyparser= require('body-parser')
app.use(bodyparser.urlencoded({extended:true}))
const cors = require('cors')
app.use(cors())
app.use(express.json())
const mongoose = require('mongoose')
const dotenv = require ('dotenv')
dotenv.config()



let port = 4200
let URI = process.env.URI


mongoose.connect(URI)



.then(()=>{
    console.log('mongoose has started');
})
.catch((error)=>{
    console.log(error);
})


let userSchema = {
    firstname: {type:String, required:true},
    lastname: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
}
userModel = mongoose.model ("input", userSchema)



app.get('/', (req, res)=>{
    res.send('hello')
})
app.set('view engine','ejs')



app.post('/user', (req,res)=>{
    let form = new userModel(req.body)
    form.save()
    .then((result)=>{
        console.log(result);
        if(result){
            // res.redirect("/input")
        }
        else{
            res.render("/signup")
        }
    })
    
})

app.get('/input', (req, res)=>{
    userModel.find()
    .then((result)=>{
        console.log(result);
        res.render("signup")
        res.send(result)
    })
    
})





app.listen(4200, ()=>{
    console.log(`server is running on port${port}`);
})