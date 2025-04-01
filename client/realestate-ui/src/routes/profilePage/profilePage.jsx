import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function ProfilePage() {
    const { currentUser, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();
    
    // Safely extract user info (handle both nested and flat structures)
    const user = currentUser?.userInfo || currentUser || null;

    const handleLogout = async () => {
        try {
            await apiRequest.post("/auth/logout", {}, {
                withCredentials: true  // Important for cookie-based auth
            });
            updateUser(null);
            localStorage.removeItem("user");  // Clear localStorage
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    }

    // Better loading/redirect handling
    if (!user) {
        return (
            <div className="profilePage">
                <div className="loading">Loading user data...</div>
            </div>
        );
    }

    return (
        <div className="profilePage">
            <div className="details">
                <div className="wrapper">
                    <div className="title">
                        <h1>User Information</h1>
                        <Link to = "/profile/update">
                        <button className="update-btn">Update Profile</button>
                        </Link>
                    </div>
                    <div className="info">
                        <div className="avatar-container">
                            <span>Avatar:</span>
                            <img 
                                src={user.avatar || "/noavatar.jpeg"} 
                                alt={user.username || "User avatar"} 
                                className="avatar-img"
                            />
                        </div>
                        <div className="user-info">
                            <span>Username: <strong>{user.username}</strong></span>
                            <span>Email: <strong>{user.email}</strong></span>
                        </div>
                        <button 
                            onClick={handleLogout}
                            className="logout-btn"
                        >
                            Logout
                        </button>
                    </div>
                    <div className="title">
                        <h1>My List</h1>
                        <button className="create-btn">Create new post</button>
                    </div>
                    <List/>
                    <div className="title">
                        <h1>Saved List</h1>
                    </div>
                    <List/>
                </div>
            </div>
            <div className="chatContainer">
                <div className="wrapper">
                    <Chat/>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;