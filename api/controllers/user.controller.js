import prisma from "../library/prisma.js";


export const getUsers = async (req, res) => {   
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        // Don't return sensitive data like passwords
      }
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to get users", error: error.message });
  }
}   

export const getUser = async (req, res) => {   
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        // Other non-sensitive fields
      }
    });

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
    const { username, email } = req.body;

    // Verify the user is updating their own account
    if (id !== req.userId) {
      return res.status(403).json({ message: "You can only update your own account" });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { username, email },
      select: {
        id: true,
        username: true,
        email: true,
      }
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update user", error: error.message });
  }
}   

export const deleteUser = async (req, res) => {   
  try {
    const { id } = req.params;

    // Verify the user is deleting their own account
    if (id !== req.userId) {
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