import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import APIRoutes from '../utils/APIRoutes';
import LeftSidebar from './LeftSidebar';
import RightSideBar from './RightSideBar';

const ChiefWardenDashboard = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(APIRoutes.authCheck, { withCredentials: true });
        if (response.data.isAuthenticated) {
          setUser(response.data.user);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.log(error);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-pink-100 to-orange-100">
      {/* Left Sidebar */}
      <LeftSidebar />

      {/* Main Content */}
      <main className="flex-1 flex justify-center items-center text-xl font-semibold text-gray-700">
        Loading user data...
      </main>

      {/* Right Sidebar */}
      <RightSideBar />
    </div>
  );
};

export default ChiefWardenDashboard;
