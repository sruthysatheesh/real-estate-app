import jwt from "jsonwebtoken";

export const shouldBeLoggedIn = async (req, res) => {
      console.log(req.userId); // Debugging line
      res.status(200).json({ message: "You are logged in!", userId: payload.id });
  };

export const shouldBeAdmin = async (req, res) => {
    const token = req.cookies.token;
  
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
      if (err) return res.status(403).json("Invalid token!");
      res.status(200).json({ message: "You are logged in as admin!", userId: payload.id });

      if (payload.isAdmin) {
        return res.status(403).json("You do not have admin privileges!");
      }
    });
}