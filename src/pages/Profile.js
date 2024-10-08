import React from 'react'
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import './Profile.css'

export default function Profile() {
  const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleLogout = () => {
      logout();
    };

  const email = user?.user?.email;
  const username = email ? email.split('@')[0] : '';
  return (
    <div className="profile-container">
    <div className="profile-card">
      <h2>Welcome {username} !</h2>
      <button className="edit-button" onClick={handleLogout}>Logout</button>
    </div>
  </div>
  )
}
