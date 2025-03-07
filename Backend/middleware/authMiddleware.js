import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Import the User model
import dotenv from "dotenv";

dotenv.config();

const verifyToken = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  
  if (!accessToken) {
    return res.status(403).json({isAuthenticated:false, msg: "No access token provided check that withCredential:true is included or not" });
  }
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError" && refreshToken) {
        // Access token expired, try to refresh it using the refresh token
        try {
          const decodedRefresh = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
          const user = await User.findById(decodedRefresh._id);

          if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({isAuthenticated:false, msg: "Unauthorized" });
          }
          
          const newAccessToken = user.generateAccessToken();
          
          res.cookie("accessToken", newAccessToken, {
            expires: new Date(Date.now() + 12 * 30 * 24 * 60 * 60 * 1000), 
            httpOnly: true,
            sameSite: 'none',
            secure: true,
          });
          req.user = user;
          req._id = user._id;
          req.username = user.username;
          req.email = user.email;
          req.role = user.role;
          req.hostel = user.hostel;
          req.profilePicture = user.profilePicture;
          next();
        } catch (refreshErr) {
          return res.status(401).json({isAuthenticated:false, msg: "Unauthorized" });
        }
      } else {
        return res.status(401).json({isAuthenticated:false, msg: "Unauthorized" });
      }
    } else {
      req.user = decoded;
      req._id = decoded._id;
      req.username = decoded.username;
      req.email = decoded.email;
      req.role = decoded.role;
      req.hostel = decoded.hostel;
      req.profilePicture = decoded.profilePicture;
      next();
    }
  });
};

export default verifyToken;