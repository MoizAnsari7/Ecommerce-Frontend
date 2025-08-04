import { useState } from 'react';
import './UserProfile.css'
import api from '../api';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

function UserProfile(){
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });

  if (!user) return <div>Loading...</div>;

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = async () => {
    try {
      const res = await api.put('/editUserProfile', formData);
      localStorage.setItem("user", JSON.stringify(res.data.data));
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div className='back-button' onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack />
        </div>
        <div className="profile-avatar">
          <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt="User Avatar" />
        </div>

        <div className="profile-info">
          {editMode ? (
            <>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your Phone Number"
              />
            </>
          ) : (
            <>
              <h2>{user.name}</h2>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
            </>
          )}
        </div>

        <div className="profile-actions">
          {editMode ? (
            <>
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
            </>
          ) : (
            <button className="edit-btn" onClick={() => setEditMode(true)}>Edit Profile</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

