const express=require('express')
const mongoose=require('mongoose')
mongoose.set('strictQuery', false);
const bp=require('body-parser')
const app=express()
app.use(express.static('Mssg'))
app.use(bp.urlencoded({
    extended:true
}))
app.set('view engine','ejs')
app.get('/',(req,res)=>{
    res.render('form')
})
mongoose.connect("mongodb://localhost:27017/test5",{
    useNewUrlParser:true,
    useUnifiedTopology:true
    
})
var db=mongoose.connection
db.on('error',()=>console.log('connection error'))
db.once('open',()=>
console.log("connected to DATABASE")
)
app.post('/form.ejs',(req,res)=>{
    var S=req.body.SName
    var C=req.body.Course
    var A=req.body.Age
    var E=req.body.Email
    var data={
        "Sname":S,
        "Course":C,
        "Age":A,
        "Email":E,
    }
    db.collection('user').insertOne(data,(err,collection)=>{
        if(err){
            throw err
        }
        console.log("Data has been inserted")
    })
    return res.redirect('success.html')
})
app.listen(3000,()=> console.log("Server Started....."))