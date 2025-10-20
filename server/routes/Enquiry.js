import express from "express"
import { createEnquiry, enquiryStatusToggle, fetchAllEnquiry, getEnquiryDetails } from "../controllers/Enquiry.js";
import { isLogedIn } from "../middlewares/auth.js";

const enquiryRouter = express.Router();

enquiryRouter.post("/add-enquiry" ,createEnquiry);
enquiryRouter.get("/get-enquiries" ,isLogedIn ,fetchAllEnquiry);
enquiryRouter.put("/update-status/:enquiryId" ,isLogedIn, enquiryStatusToggle);
enquiryRouter.get("/get-details/:enquiryId" ,isLogedIn, getEnquiryDetails);

export {enquiryRouter}