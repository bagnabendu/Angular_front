const UserModel=require('../model/user')
const bcryptjs=require('bcryptjs')
const path=require('path')

const adduser=async (req,res)=>{
    try {
        const imagee=req.file
        const adus=await new UserModel({
            username:req.body.username,
            email:req.body.email,
            image:imagee.path,
            password:bcryptjs.hashSync(req.body.password,bcryptjs.genSaltSync(10)),
            // confirmpassword:bcryptjs.hashSync(req.body.confirmpassword,bcryptjs.genSaltSync(10))
        })
        const alldata=await adus.save()
      res.status(200).json({sucess:true,msg:"data sucessfully store",data:alldata,status:200})
    } catch (error) {
        console.log(error)
        res.status(201).json({sucess:false,msg:"data not store"})

    }
}
// const login_user=async(req,res)=>{
//     try {
//         UserModel.findOne({
//             email:req.body.email
//           },(err,data)=>{
//             if(data){
//                 const hashpassword=data.password
//                 if(bcryptjs.compare(req.body.password,hashpassword)){
//                    res.status(200).json({sucess:true,msg:"login sucessfully",status:true})
//                 }else{
//                  res.status(201).json({sucess:false,msg:"password invalide",})
//                 }
//             }else{

//                 res.status(201).json({sucess:false,msg:"email invalide",})

//             }
           
//           })     
//     } catch (err) {
//         res.status(201).json({sucess:false,msg:"err..",})
//         console.log(err);
//     }
// }
const login_user = async (req, res) => {
    try {
        UserModel.findOne({
            email: req.body.email,
        }, (err, data) => {
            if (data) {
                const hashpassword = data.password
                if (bcryptjs.compareSync(req.body.password, hashpassword)) {
                    res.status(200).json({
                        status: 'success',
                        result: data,
                        message: "Login....",
                        status: true
                    });
                } else {
                    res.status(401).json({
                        result: err,
                        message: "Invalid Password"
                    });
                }              
            } else {
                res.status(401).json({
                    result: err,
                    message: "Invalid Email"
                });
            }
        })

    } catch(err) {
        console.log(err);
        res.status(201).json({
            result: err,
            message: "Not Register"
        });
    }
}

// const login =async(req ,res)=>{
//     try {
//         const { email, password } = req.body;

//         if (!(email && password)) {
//             return res.status(201).json({ success: false, message: "All input are required"})
//         }
//         const users = await UserModel.findOne({ email })
        
//         if (users && (await bcryptjs.compare(password, users.password))) {
//             return res.status(200).json({ success: true, "user": users, status:true });
//         }
//         return res.status(201).json({ success: false, message: "Invalid Credentials" });

//     }
//     catch (error) {
//         console.log(error);
//     }
// }
const getuser= async (req,res)=>{
    try{
     const gtus=await UserModel.find()
  res.status(201).json({sucess:true,msg:"data store",data:gtus})

    }catch{
        res.status(404).json({sucess:false,msg:"data not store"})

    }
}
const edit=async(req,res)=>{
    try {
       const id=req.params.id
        const editdata=await UserModel.findById(id)
        if(!editdata) {
            res.status(404).json({sucess:false,msg:"data not edit"})
        } else {
            res.status(201).json({sucess:true,msg:"data edited",data:editdata})
            
        }
    } catch (error) {
        res.status(404).json({sucess:false,msg:"data not edit"})
        
    }
}
const updatedata=async(req,res)=>{
    try {
        const _id=req.params.id
        const updateuser=await UserModel.findByIdAndUpdate(_id,req.body,{new:true})
        // if (!updateuser) {
        //     res.status(404).json({sucess:false,msg:"data not up",data:updateuser})
        // } else {
        //     res.status(201).json({sucess:true,msg:"data not updated"})
            
        // }
            res.status(201).json({sucess:true,msg:"data update",data:updateuser})

    } catch (error) {
                    res.status(404).json({sucess:false,msg:"data not updated"})

    }
}

const deleteuser=async(req,res)=>{
    try {
        // const _id=req.param.id

        const del=await UserModel.findByIdAndDelete(req.params.id)
        res.status(201).json({sucess:true,msg:"data delete",data:del})
    } catch (ex) {
        res.status(404).json({sucess:false,msg:"data not delete",ex})
        
    }
}
module.exports={
    adduser,getuser,edit,updatedata,deleteuser,login_user
}