import mongoose from 'mongoose';

const getISTDate = () => {
  let date = new Date();
  let istOffset = 5.5 * 60 * 60 * 1000;
  return new Date(date.getTime() + istOffset);
};

const ExpenseSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  buyerName: {
    type: String,
    required: true,
    trim: true,
  },
  shopName: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: getISTDate,
  },
  category: {
    type: String,
    enum: ["fruitsAndVegetables", "spices", "dairyProducts", "maintainance", "grocery", "Other"],
    default: "Other",
  },
}, {
  timestamps: true,
});

const Expense = mongoose.model('Expense', ExpenseSchema);

export default Expense;
