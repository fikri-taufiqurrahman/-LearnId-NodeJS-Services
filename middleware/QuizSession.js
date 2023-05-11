import Quiz from "../models/QuizModel.js";

export const quizSession = async (req, res, next) => {
  const quiz = await Quiz.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!quiz) return res.status(404).json({ msg: "quiz tidak ditemukan" });
  req.quizId = quiz.id;
  next();
};
