import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import APIRoutes from '../utils/APIRoutes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToast } from '../utils/toast';
import JoinHostel from '../components/JoinHostel';
import StudentLeftSideBar from '../components/StudentLeftSideBar';
import RightSideBar from '../components/RightSideBar';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [hostelCode, setHostelCode] = useState('');
  const [hostelName, setHostelName] = useState('');

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

  useEffect(() => {
    try {
      const fetchHostelData = async () => {
        const response = await axios.get(APIRoutes.getHostelName, { withCredentials: true });
        if (response.data.success) {
          setHostelName(response.data.hostelName);
        }
      };
      
      fetchHostelData();
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  const handleJoinHostel = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(APIRoutes.joinHostel, { hostelCode }, { withCredentials: true });
      // console.log(data);
      if (data.success) {
        console.log(data);
        setUser({...user, hostel: data.hostel});
        showToast(data.message, "success");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
  };

  const handleLeaveHostel = async () => {
    try {
      const response = await axios.post(APIRoutes.leaveHostel, {}, { withCredentials: true });
      if (response.data.success) {
        showToast("Successfully left the hostel", "success");
        setUser({ ...user, hostel: null });
      } else {
        showToast(response.data.message, "error");
      }
    } catch (error) {
      showToast(error.data.message, "error");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    !user.hostel 

      ? 

        <JoinHostel hostelCode={hostelCode} setHostelCode={setHostelCode} handleJoinHostel={handleJoinHostel} />
      
      :


      <div className="flex h-screen bg-gradient-to-br from-pink-100 to-orange-100">
      {/* Left Sidebar */}
      <StudentLeftSideBar />

      {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md mt-4 text-center w-full max-w-lg mx-auto">
            <img 
              src={user.profilePicture} 
              alt="Profile" 
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-300"
            />
            <h2 className="text-2xl font-semibold">{user.username}</h2>
            <p className="text-gray-600 text-lg">Hostel Name: {hostelName}</p>
            <button className="mt-6 bg-red-500 text-white px-8 py-3 rounded-md text-lg" onClick={handleLeaveHostel}>Leave Hostel</button>
          </div>
        </main>

      {/* Right Sidebar */}
      <RightSideBar />
    </div>
  );
};

export default StudentDashboard;
