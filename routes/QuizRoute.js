import { Router } from "express";
import * as Quiz from "../controllers/Quiz.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = Router();

router.route("/quiz").get(Quiz.getQuiz).post(Quiz.createQuiz);

router.route("/quiz/:id").post(Quiz.startQuiz);

router.route("/quiz/finished").post(Quiz.finishQuiz);
// .get(verifyUser, adminOnly, Users.getUserById)
// .patch(verifyUser, adminOnly, Users.updateUser)
// .delete(verifyUser, adminOnly, Users.deleteUser);

export default router;
