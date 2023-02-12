module.exports=function(req,res,next){
    if(req.query.isAdmin){
        next();
    }
    else{
        next({
            msg:"you dont have access",
            status:403
        })
    }
}