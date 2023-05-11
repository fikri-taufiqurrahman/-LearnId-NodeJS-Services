import { Router } from "express";
import * as Users from "../controllers/Users.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = Router();

router
  .route("/users")
  .get(verifyUser, adminOnly, Users.getUsers)
  .post(Users.createUser);

router
  .route("users/:id")
  .get(verifyUser, adminOnly, Users.getUserById)
  .patch(verifyUser, adminOnly, Users.updateUser)
  .delete(verifyUser, adminOnly, Users.deleteUser);

export default router;
