const users = require("../models/userSchema");

//register logic
exports.userRegister = async (req,res)=>{
    //to get image url
    const file = req.file.filename
    const {fname,lname,mobile,email,gender,location,status} = req.body
    if(!fname || !lname || !mobile || !email || !gender || !location || !status || !file){
        res.status(403).json("All inputs are required!!!")
    }
    try{
        const preuser = await users.findOne({email})
        if(preuser){
            res.status(403).json("The user already exist in our database...")
        }
        else{
            const newuser = new users({
                fname,lname,email,mobile,gender,status,profile:file,location
            })
            await newuser.save()
            res.status(200).json(newuser)
        }
    }
    catch(error){
        res.status(401).json(error)
    }
    
}

//get all users
exports.getallusers = async (req,res)=>{
    try{
        const userdata = await users.find()
        res.status(200).json(userdata)
    }
    catch(error){
        res.status(401).json(error)
    }
}

//get a user
exports.getuserdetail = async (req,res)=>{
    const {id} = req.params
    try{
        const userdata = await users.findOne({_id:id})
        if(userdata){
            res.status(200).json(userdata)
        }
        else{
            res.status(404).json("User doesnot exist!!")
        }
        
    }
    catch(error){
        res.status(401).json(error)
    }
}