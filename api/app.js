import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import postRoute from "./routes/post.routes.js";
import authRoute from "./routes/auth.routes.js";
import testRoute from "./routes/test.routes.js";
import userRoute from "./routes/user.routes.js";
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// Middleware - MUST be before routes
app.use(cors({
  origin: process.env.CLIENT_URL, // Replace with your frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded forms

// Routes
app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/users", userRoute);

app.listen(8800, () => {
  console.log('Server is running on port 8800');
});