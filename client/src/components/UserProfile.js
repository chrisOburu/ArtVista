import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../api';

const UserProfile = ({ token }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile(token);
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to load profile', error);
      }
    };

    fetchProfile();
  }, [token]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h2>{profile.name}</h2>
      <p>{profile.email}</p>
      {/* Add more profile details and editing functionality */}
    </div>
  );
};

export default UserProfile;
