import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Import the User model
import dotenv from "dotenv";

dotenv.config();

const verifyToken = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken) {
    return res.status(403).json({ msg: "No access token provided" });
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError" && refreshToken) {
        // Access token expired, try to refresh it using the refresh token
        try {
          const decodedRefresh = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
          const user = await User.findById(decodedRefresh._id);

          if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({ msg: "Unauthorized" });
          }
          
          const newAccessToken = user.generateAccessToken();
          
          res.cookie("accessToken", newAccessToken, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), 
            httpOnly: true,
            sameSite: 'none',
            secure: true,
          });

          req._id = user._id;
          req.username = user.username;
          req.email = user.email;
          next();
        } catch (refreshErr) {
          return res.status(401).json({ msg: "Unauthorized" });
        }
      } else {
        return res.status(401).json({ msg: "Unauthorized" });
      }
    } else {
      req._id = decoded._id;
      req.username = decoded.username;
      req.email = decoded.email;
      next();
    }
  });
};

export default verifyToken;