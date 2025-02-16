import React, { useState, useEffect } from "react";
import axios from "axios";
import APIRoutes from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChiefWardenLeftSidebar from "../components/ChiefWardenLeftSidebar";
import AccountantLeftSidebar from "../components/AccountantLeftSidebar";
import StudentLeftSidebar from "../components/StudentLeftSidebar";
import RightSideBar from "../components/RightSideBar";

const DailyExpenses = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [expenses, setExpenses] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(APIRoutes.authCheck, { withCredentials: true });
                if (response.data.isAuthenticated) {
                    setRole(response.data.user.role);
                } else {
                    navigate("/login");
                }
            } catch (error) {
                console.log(error);
                navigate("/login");
            }
        };

        fetchUserData();
    }, [navigate]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get(`${APIRoutes.dailyExpense}?date=${selectedDate}`, { withCredentials: true });
                // Set only the expenses array from the response
                setExpenses(response.data.expenses);
            } catch (error) {
                console.error("Error fetching expenses:", error);
            }
        };

        fetchExpenses();
    }, [selectedDate]);

    const totalExpense = expenses.reduce((sum, expense) => sum + expense.price * expense.quantity, 0);

    if(!role)(
        <>
            Loading...
        </>
    );

    return (
        <div className="flex h-screen bg-gradient-to-br from-pink-100 to-orange-100">
            {/* Left Sidebar */}
            {role === "chiefWarden" ? (
                <ChiefWardenLeftSidebar />
            ) : role === "accountant" ? (
                <AccountantLeftSidebar />
            ) : (
                <StudentLeftSidebar />
            )}

            {/* Main Content */}
            <main className="flex-1 flex justify-center items-center text-xl font-semibold text-gray-700">
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg" style={{ background: "linear-gradient(to bottom, #fde2e4, #fad2e1)" }}>
                    <h2 className="text-2xl font-bold mb-4 text-center">Daily Expenses</h2>

                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full p-2 border rounded mb-4"
                        max={new Date().toISOString().split("T")[0]}
                    />

                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">Item</th>
                                <th className="border p-2">Price (₹)</th>
                                <th className="border p-2">Quantity</th>
                                <th className="border p-2">Total (₹)</th>
                                <th className="border p-2">Buyer</th>
                                <th className="border p-2">Shop</th>
                                <th className="border p-2">Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.length > 0 ? (
                                expenses.map((expense) => (
                                    <tr key={expense._id} className="text-center">
                                        <td className="border p-2">{expense.itemName}</td>
                                        <td className="border p-2">₹{expense.price}</td>
                                        <td className="border p-2">{expense.quantity}</td>
                                        <td className="border p-2">₹{expense.price * expense.quantity}</td>
                                        <td className="border p-2">{expense.buyerName}</td>
                                        <td className="border p-2">{expense.shopName}</td>
                                        <td className="border p-2">{expense.category}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="border p-2 text-center">No expenses recorded for this date</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <p className="text-xl font-bold text-center mt-4">Total Expense: ₹{totalExpense}</p>
                </div>
            </main>
            {/* Right Sidebar */}
            <ToastContainer />
            <RightSideBar />
        </div>
    );
};

export default DailyExpenses;
