const mongoose=require("mongoose");

const AddressSchema=new mongoose.Schema(
    {
        addresstext:{type:String,require:true}
        
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model("address",AddressSchema)