import React, { useContext, useEffect, useState } from 'react';
import profileInstance from '../api';
import { AuthContext } from '../AuthContext';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profileInstance.get('profile/');
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {profile ? (
        <div>
          <p>Age: {profile.age}</p>
          <p>Weight: {profile.weight}</p>
          <p>Height: {profile.height}</p>
          <p>Fitness Goals: {profile.fitness_goals}</p>
          <p>Health Conditions: {profile.health_conditions}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;