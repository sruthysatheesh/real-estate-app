import "./login.scss";
import apiRequest from "../../lib/apiRequest";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Login() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { updateUser } = useContext(AuthContext);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);
      
      try {
          const formData = {
              username: e.target.username.value,
              password: e.target.password.value
          };

          const response = await apiRequest.post("/auth/login", formData, {
              withCredentials: true
          });

          console.log("Login response:", response.data); // Debug log

          if (!response.data?.user) {
              throw new Error("Invalid response structure");
          }

          // Verify user data structure
          const userData = response.data.user;
          if (!userData.username || !userData.id) {
              throw new Error("Missing required user fields");
          }

          updateUser(userData);
          navigate("/");
          
      } catch (err) {
          console.error("Login error:", err);
          setError(err.response?.data?.error || 
                 err.message || 
                 "Login failed. Please try again.");
      } finally {
          setIsLoading(false);
      }
  };
    
    return (
        <div className="login">
            <div className="formContainer">
                <form onSubmit={handleSubmit}> {/* Fixed: handleSubmit */}
                    <h1>Welcome back</h1>
                    <input 
                        name="username" 
                        type="text" 
                        placeholder="Username" 
                        required 
                    />
                    <input 
                        name="password" 
                        type="password" 
                        placeholder="Password" 
                        required 
                    />
                    <button disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                    {error && <span className="error">{error}</span>}
                    <Link to="/register">Don't have an account?</Link>
                </form>
            </div>
            <div className="imgContainer">
                <img src="/bg.png" alt="Background" />
            </div>
        </div>
    );
}

export default Login;