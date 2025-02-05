import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import APIRoutes from '../utils/APIRoutes';
import { ToastContainer } from 'react-toastify';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(APIRoutes.authCheck, { withCredentials: true });
        // console.log(response.data);
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
    <div className="dashboard">
      <div>Accountant</div>
    </div>
  );
};

export default Dashboard;