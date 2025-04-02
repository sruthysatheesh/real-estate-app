import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/authContext";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";

function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [avatar, setAvatar] = useState(currentUser.avatar || null);
  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    if (formData.password) formDataToSend.append('password', formData.password);
    if (avatar && avatar instanceof File) formDataToSend.append('avatar', avatar);
    if (currentUser.avatar) formDataToSend.append('oldAvatar', currentUser.avatar);

    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      updateUser(res.data);
      navigate("/profile");
    } catch (err) {
      console.error("Update error:", err);
      setError(err.response?.data?.message || "Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return <div className="loading">Loading user data...</div>;
  }

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          
          {error && <div className="error">{error}</div>}
          
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="item">
            <label htmlFor="password">New Password (leave blank to keep current)</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          
          <div className="item">
            <label htmlFor="avatar">Profile Picture</label>
            <input
              id="avatar"
              name="avatar"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </div>
          
          <button disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
      
      <div className="sideContainer">
        <div className="avatarPreview">
          <img 
            src={avatar ? (avatar instanceof File ? URL.createObjectURL(avatar) : avatar) : "/noavatar.jpeg"} 
            alt="Profile preview" 
          />
          <p>Preview</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileUpdatePage;