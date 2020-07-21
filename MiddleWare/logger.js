
const logger=

(req,res,next)=>{
        console.log(req.params.id)
        console.log(`${req.protocol}`)
        console.log(`${req.get("host")}`)
        console.log(next)
   
next()
}
    module.exports=logger