import express from "express";
import {
  getUser,
  getUsers,
  updateUser,
  deleteUser
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", verifyToken, getUsers);
router.get("/:id", verifyToken, getUser);
router.put("/:id", verifyToken, upload.single("avatar"), updateUser); // Combined route
router.delete("/:id", verifyToken, deleteUser);

export default router;