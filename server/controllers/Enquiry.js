import Enquirys from "../models/Enquirys.js";
import User from "../models/User.js";
import EnquirySubmitted from "../templates/EnquirySubmitted.js";
import mailSender from "../utils/mailSender.js"

export const createEnquiry = async (req, res) => {
  try {
    const {
      products,
      companyName,
      message,
      name,
      email,
      contact
    } = req.body;

    // Basic validation
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ success: false, error: "Products array is required." });
    }


    const enquiry = new Enquirys({
      products,
      customerName: name,
      customerEmail: email,
      customerContact: contact,
      companyName,
      message,
      status: "pending",
    });

    const saved = await enquiry.save();


    const enquiryData = { companyName: companyName, email: email, name: name, contact: contact }
    // console.log(enquiryData)

    const mailTemplate = EnquirySubmitted(enquiryData)
    await mailSender(email, "Enquiry submitted successfully", mailTemplate)

    res.status(201).json({ success: true, message: "Enquiry submitted successfully.", enquiry: saved });

  } catch (err) {
    console.error("Error creating enquiry:", err);
    res.status(500).json({ success: false, error: "Server error. Please try again later." });
  }
};

export const fetchAllEnquiry = async (req, res) => {
  try {
    const enquires = await Enquirys.find({} , {customerName : 1 ,customerEmail :1 ,status : 1, companyName :1 });

    if (!enquires || enquires.length == 0) {
      return res.status(200).json({ success: true, message: "No enquires was there", enquires: enquires })
    }

    return res.status(200).json({ success: true, message: "All Enquiry fetch successfully ", enquires: enquires })

  } catch (error) {
    return res.status(500).json({ success: false, message: "Something went wrong while fetching enquiry", error: error })
  }
};

export const enquiryStatusToggle = async (req, res) => {

  const enquiryId = req.params.enquiryId;

  try {

    const enquiry = await Enquirys.findById(enquiryId);

    if (enquiry.status == "pending") {
      enquiry.status = "responded";
    } else {
      enquiry.status = "pending";
    }
    enquiry.save();
    return res.status(200).json({ success: true, message: "Enquiry status updated", status: enquiry.status });

  } catch (error) {

    return res.status(500).json({ success: true, message: "Something went wrong , try again later", error: error });

  }

};

export const getEnquiryDetails = async (req, res) => {

  const enquiryId = req.params.enquiryId;

  try {
    const enquiry = await Enquirys.findById(enquiryId).populate({
      path: 'products.product',
      select: 'name images '
    });;

    if (!enquiry) {
      return res.status(200).json({ success: false, message: "Enquiry not found" })
    }

    return res.status(200).json({ success: true, message: "Enquiry details fetch successfully ", enquiry })

  } catch (error) {
    return res.status(500).json({ success: false, message: "Something went wrong while fetching enquiry details", error: error })
  }
}