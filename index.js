const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const Notes=require('./Notes.json')
const fs= require('fs')


const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
bodyParser.urlencoded({ extended: false })
app.use(cors())



app.post('/register',(req,res)=>{
    res.send({message:"hello user created req.body.Name Enjoy"})
})


app.get('/view/:Name',(req,res)=>
{

const data=fs.readFileSync('Notes.json')
var JsData=JSON.parse(data)
JsData.Records.forEach(Record => {
if(Record.name==req.params.Name)
{
    return res.send(Record.notes)
}
});
return res.send("record not found")
})

app.post('/Add',(req,res)=>{
    var flag=0
    const data=fs.readFileSync('Notes.json')
    var JsData=JSON.parse(data)
    JsData.Records.forEach(Record=>{
if(Record.name==req.body.Name){
    flag=1
    return res.sendStatus(404)
    
}
    })
    if (flag!=1){
    JsData.Records.push({"name":req.body.Name,"notes":req.body.Note})
    FileData=JSON.stringify(JsData)
    fs.writeFileSync('Notes.json',FileData)
    return res.send(`${req.body.Note}`)
    }
})

app.delete('/delete/:Name',(req,res)=>{
    const data=fs.readFileSync('Notes.json')
    var JsData=JSON.parse(data)
    flag=JsData.Records.some(Record=>Record.name===req.params.Name)
    if(flag){
        Records=JsData.Records.filter(Record=>Record.name!==req.params.Name)
        JsData.Records=Records
        FileData=JSON.stringify(JsData)
        fs.writeFileSync('Notes.json',FileData)
        return res.send(`${req.params.Name}`)
    }
    else{
    res.send(`${req.params.Name}`)
    }
})

app.listen(process.env.PORT|| 8081)