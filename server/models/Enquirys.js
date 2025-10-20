import mongoose from "mongoose"

const enquirySchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        },
        quantity: {
            type: Number,
            min: [1, 'Quantity must be at least 1'],
            default: 1,
        },
        message: {
            type: String,
            default: "",
        }
    }],
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "user"
    // },
    customerName: {
        required: true,
        type: String,
    },
    customerEmail: {
        required: true,
        type: String,
    },
    customerContact: {
        required: true,
        type: String,
    },
    companyName: {
        type: String,
    },
    message: {
        type: String,
    },
    status: {
        type: String,
        enum: ["pending", "responded", "closed"]
    }

}, { timestamps: true })

const Enquirys = mongoose.model("enquiry", enquirySchema);

export default Enquirys;