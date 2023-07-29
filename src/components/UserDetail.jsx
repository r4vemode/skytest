import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UserDetail() {
  const { username } = useParams();
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUserDetails(response.data);
    };

    fetchData();
  }, [username]);

  return (
    <div>
      <h1>{userDetails.login}</h1>
      <p>{userDetails.bio}</p>
      <p>{userDetails.email}</p>
      // Add more fields as needed
    </div>
  );
}

export default UserDetail;
