const express=require('express')
const app=express()
const router=express.Router()
const connectDB = require('./config/connectDB')
const User=require('./models/User')



connectDB()
/* //users creation (to test before routes)
User.create([{name:"Jack",email:"jack@gmail.com",phone:50003121},
             {name:"Jane",email:"jane@gmail.com",phone:56111516},
             {name:"Akrem",email:"akrem@gmail.com",phone:20964162}
                ])
    .then(doc => {
        console.log(doc)
    })
    .catch((error) => {
        console.error(error);
       })
*/

//@add new user
//@method POST
//@req.body
router.post('/',async(req,res)=>{
    try {
        const {name,email,phone}=req.body
if(!name||!email){
    return res.status(400).send("name and email are required")
}
const usertst= await User.findOne({email})
if(usertst){
    return res.status(400).send("User is already exist")
}

        const addUser= new User({
          name,email,phone  
        })
        await addUser.save()
        res.status(200).send({msg:"user added",addUser})
    } catch (error) {
        res.status(500).send("unable to add user")
    }
})

//@return all users
//@method GET
router.get('/',async(req,res)=>{
    try {
        const allUsers=await User.find()
        res.status(200).send({msg:"all users",allUsers})
    } catch (error) {
        res.status(500).send("unable to get users")
    }
})

//@update user
//@method PUT
//@req.body
//@req.params
router.put("/:Id",async(req,res)=>{
 try {
    const {Id}=req.params
    const updateUser=await User.findOneAndUpdate({_id:Id},{$set:{...req.body}})
    res.status(200).send({msg:"User updated",updateUser})
 } catch (error) {
    res.status(500).send("unable to update user")
 }
})

//@delete user
//@method DELETE
//@req.params
router.delete('/:Id',async(req,res)=>{
    try {
        const {Id}=req.params
        const deleteUser=await User.findByIdAndDelete(Id)
        res.status(200).send({msg:"user deleted",deleteUser})
    } catch (error) {
        res.status(500).send("unable to delete user")
    }
})

//@return one user
//@method GET
//@req.params
router.get('/:Id',async(req,res)=>{
try {
    const {Id}=req.params
    const oneUser = await User.findOne({_id:Id})
    res.status(200).send({msg:"Requested user",oneUser})
} catch (error) {
    res.status(500).send("unable to get user")
}
})

app.listen(5000,(err)=>{
    err ? console.log(err):console.log("server running on port 5000")
})