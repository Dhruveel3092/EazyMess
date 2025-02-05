import dotenv from "dotenv";
import Menu from "../models/Menu.js";

dotenv.config();

  const messMenu = async (req, res, next) => {  
    try {
      const menu = await Menu.find();
      res.json(menu);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }

export {
    messMenu
};