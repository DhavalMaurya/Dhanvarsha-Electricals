import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"]
    },
    description: {
        type: String,
        required: [true, "Product description is required"]
    },
    features: [{
        type: String,
        required: [true, "Product feature is required"],
    }],
    images: [{
        type: String,
        required: [true, "Product image is required"],
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        // required: [true, "Product Category is required"],
    },
    availability: {
        type: String,
        default: "inStock",
        // enum: ["inStock , soldOut "],
    }
}, { timestamps: true })

const Products = mongoose.model("product", productSchema);

export default Products 