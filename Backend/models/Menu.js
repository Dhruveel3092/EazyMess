import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    required: true,
    unique: true,
  },
  meals: {
    breakfast: { type: String, required: true },
    lunch: { type: String, required: true },
    snacks: { type: String, required: true },
    dinner: { type: String, required: true },
  },
});

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;