import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    heroImages: [{
        type: String,
        required: [true, "Category name is required"]
    }],
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }],

},{timestamps : true})

const Images = mongoose.model("images" , imageSchema);

export default Category;