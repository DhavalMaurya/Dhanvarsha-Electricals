import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name is required"]
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }],

},{timestamps : true})

const Category = mongoose.model("category" , categorySchema);

export default Category;