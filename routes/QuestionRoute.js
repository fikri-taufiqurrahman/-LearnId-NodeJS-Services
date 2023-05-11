import { Router } from "express";
import * as Question from "../controllers/Question.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = Router();
router.route("/question").post(Question.createQuestions);
router.route("/question/:id").get(Question.getQuestionsById);

// .get(verifyUser, adminOnly, Users.getUserById)
// .patch(verifyUser, adminOnly, Users.updateUser)
// .delete(verifyUser, adminOnly, Users.deleteUser);

export default router;
