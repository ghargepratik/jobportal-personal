const Address=require("../models/addressSchema.js");

const addAddress=async(req,res,next)=>{
    console.log("in")
        console.log("body",req.body);
        try{
            const address=await Address.create(req.body);
            // console.log("🚀 ~ file: addressController.js ~ line 7 ~ addAddress ~ address", address)

            return res.status(201).json({
                address,
                message: 'Address Saved Successfully',
            })

        }catch(err){
            return res.status(500).json({
                message: err,
            })
        }
}


//Get All Adddress
const getAllAddresses=async(req,res,next)=>{

        try{
            const addresses=await Address.find();
            // console.log("🚀 ~ file: addressController.js ~ line 25 ~ getAllAddresses ~ addresses", addresses)
            
            return res.status(200).json({
                addresses,
                message: 'All Address',
            })

        }catch(err){
            return res.status(500).json({
                message: err,
            })
        }
}

//GET Single Address
const getSingleAddress=async(req,res,next)=>{

        const Id=req.params.addressid
        console.log("🚀 ~ file: addressController.js ~ line 22 ~ EditAddress ~ Id", Id)

        try{
            const address=await Address.findById(Id);
            // console.log("🚀 ~ file: addressController.js ~ line 7 ~ addAddress ~ address", address)

            return res.status(200).json({
                address,
                message: 'Address Updated Successfully',
            })

        }catch(err){
            console.log("🚀 ~ file: addressController.js ~ line 58 ~ getSingleAddress ~ err", err)
            return res.status(500).json({
                message: err,
            })
        }
}

//Update Address
const editAddress=async(req,res,next)=>{
    
        const Id=req.params.addressid
        console.log("🚀 ~ file: addressController.js ~ line 22 ~ EditAddress ~ Id", Id)
        console.log("body",req.body);
        try{
            const address=await Address.findByIdAndUpdate(Id,{$set:{addresstext:req.body.addresstext}},{new:true});  
               
            // console.log("🚀 ~ file: addressController.js ~ line 7 ~ addAddress ~ address", address)

            return res.status(200).json({
                address,
                message: 'Address Updated Successfully',
            })

        }catch(err){
            console.log("🚀 ~ file: addressController.js ~ line 81 ~ editAddress ~ err", err)
            return res.status(500).json({
                message: err,
            })
        }
}


//Update Address
const deleteAddress=async(req,res,next)=>{
    
        const Id=req.params.addressid
        console.log("🚀 ~ file: addressController.js ~ line 22 ~ deleteAddress ~ Id", Id)
      
        try{
            const address=await Address.findByIdAndDelete(Id);
            // console.log("🚀 ~ file: addressController.js ~ line 7 ~ addAddress ~ address", address)

            return res.status(200).json({
                address,
                message: 'Address Deleted Successfully',
            })

        }catch(err){
            return res.status(500).json({
                message: err,
            })
        }
}


module.exports={
    addAddress,
    getAllAddresses,
    getSingleAddress,
    editAddress,
    deleteAddress
}