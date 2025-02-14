import User from "../models/User.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Menu from "../models/Menu.js";
import Notice from "../models/Notice.js";
import { v2 as cloudinary } from "cloudinary";
import Complaint from "../models/Complaint.js";

dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRETE,
  secure : true,
});

const addAccountant = async (req, res, next) => {

    if(req.user.role !== "chief-warden")
        return res.status(401).json({success:false, message:"Unauthorized Access."});

    const { username, email, password, hostel } = req.body;
    const emailCheck = await User.findOne({ email });

    if(emailCheck)
        return res.status(409).json({success:false, message:"Email already exists."});
   
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ 
      username, 
      email, 
      password:hashedPassword,
      role: "accountant",
      hostel,
    });

    return res.status(201).json({success:true, message:"Accountant added successfully."});
  };

  const changeMenu = async (req, res) => {
    console.log(req);
    if(!(req.user.role === "chiefWarden" || req.user.role === "accountant"))
        return res.status(401).json({success:false, message:"Unauthorized Access."});

    const { day } = req.params;
    const { mealType, value } = req.body;
  
    try {
      const updatedMenu = await Menu.findOneAndUpdate(
        { 
          day,
          hostel: req.user.hostel
        },
        { $set: { [`meals.${mealType}`]: value } },
        { new: true }
      );
      
      if (updatedMenu) {
        res.json(updatedMenu);
      } else {
        res.status(404).json({ error: "Menu not found for the specified day" });
      }
    } catch (error) {
      console.error("Error updating menu:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  const getSignatureForUpload = async (req, res, next) => {
    try {
      const timestamp = Math.round((new Date).getTime() / 1000);
      const signature = cloudinary.utils.api_sign_request({
        timestamp,
      },process.env.CLOUDINARY_API_SECRETE);
      // console.log("Timestamp:", timestamp);
      return res.json({timestamp,signature});
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  const uploadNotice = async (req, res, next) => {
    try {
      if(!(req.user.role === "chiefWarden" || req.user.role === "accountant"))
        return res.status(401).json({success:false, message:"Unauthorized Access."});
      const { title, description, file } = req.body;
      const hostel = req.user.hostel;
      const notice = await Notice.create({ title, description, file, hostel });
      return res.json( {success:true, message:"Notice added successfully."} );
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  const resolveComplaint = async (req, res) => {
    if(req.user.role !== "chiefWarden")
        return res.status(401).json({success:false, message:"Unauthorized Access."});

    const { complaintId } = req.body;
    const complaint = await Complaint.findById(complaintId);

    if(!complaint)
        return res.status(404).json({success:false, message:"Complaint not found."});

    if(complaint.status !== "pending")
        return res.status(400).json({success:false, message:"Complaint is not pending."});

    complaint.status = "resolved";
    await complaint.save();

    return res.status(200).json({success:true, message:"Complaint resolved successfully.", updatedComplaint: complaint});
  };

export {
    addAccountant,
    changeMenu,
    getSignatureForUpload,
    uploadNotice,
    resolveComplaint,
};