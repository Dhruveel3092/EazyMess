import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import APIRoutes from '../utils/APIRoutes';
import { ToastContainer } from 'react-toastify';

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(APIRoutes.authCheck, { withCredentials: true });
        console.log(response.data);
        if (response.data.isAuthenticated) {
          setUsername(response.data.username);
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
    <div className="dashboard">
      <h1>Welcome to the Dashboard</h1>
        <p>Hello, {username}!</p>
    </div>
  );
};

export default Dashboard;