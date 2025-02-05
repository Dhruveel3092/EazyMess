import User from "../models/User.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Menu from "../models/Menu.js";

dotenv.config();

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

    if(req.user.role !== "chief-warden" || req.user.role !== "accountant")
        return res.status(401).json({success:false, message:"Unauthorized Access."});

    const { day } = req.params;
    const { mealType, value } = req.body;
  
    try {
      const updatedMenu = await Menu.findOneAndUpdate(
        { day },
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

export {
    addAccountant,
    changeMenu
};