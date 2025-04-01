import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import prisma from "../library/prisma.js";

export const register = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Debugging line
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ 
        error: "All fields (username, email, password) are required!" 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Here you would typically save to database
    console.log("Hashed password:", hashedPassword);
    
    const newUser = await prisma.user.create({
        data: {
            username,
            email,
            password:hashedPassword,
            avatar:"",
        },
    });

    console.log(newUser)

    return res.status(201).json({ 
      message: "User registered successfully",
      user: { username, email } 
    });

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Registration failed" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(404).json({ error: "User not found!" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ error: "Wrong password!" });
    
    const age = 1000 * 60 * 60 * 24 * 7; // 1 week
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: age });

    // Remove password and send complete user info
    const { password: _, ...userData } = user;
    
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: age,
      sameSite: 'strict',
      // secure: true // Enable in production
    }).status(200).json({ 
      message: "Login successful",
      user: userData // Important: This matches frontend expectation
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Login failed" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({message:"Logged out!"});
};