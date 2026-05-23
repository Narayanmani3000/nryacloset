import mongoose from "mongoose";    

const orderSchema = new mongoose.Schema({
    customer:{
        name:String,
        phone:String,
        address:String,
    },
    items:Array,

    amount:Number,

    orderId:String,

    paymentId:String,

    status:{
        type: String,
        default: "Paid"
    },

    createdAt:String,
});

export default mongoose.model("Order", orderSchema);