import "./register.scss";
import apiRequest from "../../lib/apiRequest";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Register() {
  
    const [error,setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Replace with your loading state if needed
    const navigate = useNavigate();

    const handlesubmit = async (e) => {
      e.preventDefault(); // Prevent the default form submission behavior
      const formData = new FormData(e.target);

      const username = formData.get("username");
      const email = formData.get("email");
      const password = formData.get("password");

      try {
      const response = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });

      navigate("/login"); // Redirect to login page after successful registration
      }catch (err) {
        console.error("Registration error:", err);
        setError(
          err.response?.data?.message || 
          "Registration failed. Please try again."
        );
      }finally {
        setIsLoading(false); // Reset loading state
      }
  };

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handlesubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;