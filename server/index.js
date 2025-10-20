import express from "express"
import { productRouter } from "./routes/Product.js"
import { categoryRouter } from "./routes/Category.js";
import cors from "cors"
import compression from "compression"
import { dbConnect } from "./config/db.js"
import { userRouter } from "./routes/User.js";
import { enquiryRouter } from "./routes/Enquiry.js";
const app = express();
const PORT = 5000;;

// dotenv.config();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
dbConnect();
app.use("/api/product/", productRouter);
app.use("/api/category/", categoryRouter);
app.use("/api/auth", userRouter)
app.use("/api/enquiry", enquiryRouter)
app.use(compression());

app.get("/health" , (req , res)=>{
    res.status(200).json({ status: "ok", message: "API is alive!" });
})

app.listen(PORT, (error) => {

    if (error) {
        return console.log(error);
    }

    console.log("Server is running... ");

})