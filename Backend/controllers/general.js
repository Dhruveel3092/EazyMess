import mongoose from "mongoose";
import Menu from "../models/Menu.js";
import Notice from "../models/Notice.js";
import Complaint from "../models/Complaint.js";
import Rating from "../models/Rating.js";
import Hostel from "../models/Hostel.js";
import dotenv from "dotenv";

dotenv.config();

  const messMenu = async (req, res, next) => {  
    try {
      const menu = await Menu.find({ hostel: req.user.hostel });
      res.status(200).json(menu);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }

  const getNotices = async (req, res, next) => {
    try {
      const notices = await Notice.find({ hostel: req.user.hostel }).sort({ createdAt: -1 });
      res.status(200).json(notices);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }

  const getPendingComplaints = async (req, res, next) => {
    try {
      const complaints = await Complaint.find({ hostel: req.user.hostel, status: "pending" }).sort({ createdAt: -1 });
      res.status(200).json(complaints);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }

  const getResolvedComplaints = async (req, res, next) => {
    try {
      const complaints = await Complaint.find({ hostel: req.user.hostel, status: "resolved" }).sort({ createdAt: -1 });
      res.status(200).json(complaints);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }

  const getAverageRating = async (req, res, next) => {
    try {
      // Get current time in IST
      const nowIST = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      // Compute the start of the day in IST
      nowIST.setHours(0, 0, 0, 0);
      console.log("Start of IST day:", nowIST);
  
      const hostelId = new mongoose.Types.ObjectId(req.user.hostel);
      const ratingsAggregation = await Rating.aggregate([
        {
          $match: {
            hostel: hostelId,
            time: { $gte: nowIST }
          }
        },
        {
          $group: {
            _id: null,
            averageRating: { $avg: "$rating" },
            totalRatings: { $sum: 1 },
            userList: { $push: "$user" }
          }
        }
      ]);
  
      // Set default values if no ratings exist today
      const averageRating = ratingsAggregation[0]?.averageRating || 0;
      const totalRatings = ratingsAggregation[0]?.totalRatings || 0;
      const userList = ratingsAggregation[0]?.userList || [];
  
      let userHasRated = false;
      let ratingObject = null;
      if (req.user.role === "student") {
        userHasRated = userList.map(userId => userId.toString()).includes(req.user._id.toString());
        if (userHasRated) {
          ratingObject = await Rating.findOne({
            user: req.user._id,
            hostel: hostelId,
            time: { $gte: nowIST }
          });
        }
      }
      console.log({ averageRating, totalRatings, userHasRated, rating: ratingObject });
      res.status(200).json({ averageRating, totalRatings, userHasRated, rating: ratingObject });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };

  const getWeeklyRatings = async (req, res, next) => {
    try {
      // Get current IST time and compute the date of 7 days ago in IST
      const nowIST = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      const sevenDaysAgoIST = new Date(nowIST);
      sevenDaysAgoIST.setDate(sevenDaysAgoIST.getDate() - 7);
  
      // Convert req.user.hostel to ObjectId for matching
      const hostelId = new mongoose.Types.ObjectId(req.user.hostel);
  
      // Aggregate ratings from the past 7 days based on the IST "time" field grouping by day of week
      const weeklyRatingsAggregation = await Rating.aggregate([
        {
          $match: {
            hostel: hostelId,
            time: { $gte: sevenDaysAgoIST }
          }
        },
        {
          $group: {
            _id: { $dayOfWeek: "$time" }, // Sunday=1, Monday=2, ..., Saturday=7
            averageRating: { $avg: "$rating" },
            totalRatings: { $sum: 1 }
          }
        },
        {
          $sort: { "_id": 1 }
        }
      ]);
  
      // Map the day numbers to day names
      const dayMap = {
        1: "Sun",
        2: "Mon",
        3: "Tue",
        4: "Wed",
        5: "Thu",
        6: "Fri",
        7: "Sat"
      };
  
      // Format the aggregation output to include day string
      const weeklyData = weeklyRatingsAggregation.map(entry => ({
        day: dayMap[entry._id],
        averageRating: entry.averageRating,
        totalRatings: entry.totalRatings
      }));
  
      res.status(200).json(weeklyData);
    } catch (error) {
      console.error("Error fetching weekly ratings:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };

  const getHostelName = async (req, res, next) => {
    try {
      const hostel = await Hostel.findById(req.user.hostel);
      if (!hostel) {
        return res.status(404).json({ success: false, message: "Hostel not found" });
      }
      res.status(200).json({ success: true, hostelName: hostel.hostelName });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };

export {
    messMenu,
    getNotices,
    getPendingComplaints,
    getResolvedComplaints,
    getAverageRating,
    getWeeklyRatings,
    getHostelName,
};