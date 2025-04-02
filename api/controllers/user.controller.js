import prisma from "../library/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {   
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to get users", error: error.message });
  }
}   

export const getUser = async (req, res) => {   
  try {
    const { id } = req.params.id;
    const user = await prisma.user.findUnique({
      where: { id }
    });
    res.status(200).json(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Failed to get user", error: error.message });
  }
}   

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const tokenUserId = req.userId;
    const { password, ...inputs } = req.body;

    if (id !== tokenUserId) {
      return res.status(403).json({ message: "You can only update your own account" });
    }

    let avatarUrl;
    if (req.file) {
      avatarUrl = `/uploads/${req.file.filename}`;
      // Delete old avatar if exists
      if (req.body.oldAvatar) {
        const oldAvatarPath = path.join(__dirname, '../public', req.body.oldAvatar);
        if (fs.existsSync(oldAvatarPath)) {
          fs.unlinkSync(oldAvatarPath);
        }
      }
    }

    let updatedPassword;
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatarUrl && { avatar: avatarUrl }),
      },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        createdAt: true
      }
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ 
      message: "Failed to update user", 
      error: error.message 
    });
  }
}; 

export const deleteUser = async (req, res) => {   
  try {

    const { id } = req.params; // Fix destructuring
    const tokenUserId = req.userId; // Changed from req.tokenUserId to req.userId

    if (id !== tokenUserId) {
      return res.status(403).json({ message: "You can only delete your own account" });
    }

    await prisma.user.delete({
      where: { id }
    });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
}