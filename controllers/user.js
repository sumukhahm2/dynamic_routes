const User=require('../models/user')


exports.postUsers= async (req,res,next)=>{ 
    try{
    const name=req.body.username
    const email=req.body.email
    const phone=req.body.phone
    console.log(req.body)
    const data=await User.create(req.body)
    console.log(data)
    res.status(201).json({newUserDetail:data}) 
    }catch(err)
    {
        res.status(500).json({error:err})
    }
}

exports.getUsers= async (req,res,next)=>{ 
    
    await User.findAll()
     .then(result=>{
         res.status(201).json({newUserDetail:result})
     })
     .catch(err=>{
         console.log(err)
     })
    
 }


exports.deleteUser= async(req,res,next)=>{

    try{
        if(req.params.id== 'undefined')
        {
            console.log("id is missing")
            res.status(400).json({err:'id is missing'})
        }
        console.log(req.params.id)
        const uid=req.params.id
        await User.destroy({where:{id:uid}})
    
        res.sendStatus(200)
    }
    catch(err){
       console.log(err)
       res.status(500).json(err)
    }
    
}