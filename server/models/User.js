import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    contact: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    // enquiry: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "enquiry",
    // }],
    role : {
        type : String,
        required : true,
        enum : ["user" , "admin"]
    },
    // cart : [{
    //     productId : {
    //         type : mongoose.Schema.Types.ObjectId,
    //         ref : "product"
    //     },
    //     quantity : {
    //         type : Number,
    //         min: [1, 'Quantity must be at least 1'],
    //         default : 1,
    //     }
    // }]  
} , {timestamps : true})

const User = mongoose.model("user", UserSchema);

export default User;