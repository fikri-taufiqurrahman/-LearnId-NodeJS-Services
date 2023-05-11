import Quiz from "../models/QuizModel.js";

export const startQuiz = async (req, res) => {
  const quiz = await Quiz.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!quiz) return res.status(404).json({ msg: "Quiz tidak ditemukan" });
  req.session.quizId = quiz.id;
  const quizId = req.session.quizId;
  res.status(200).json({ msg: `mulai quiz berhasil dengan quiz ke ${quizId}` });
};

export const checkQuiz = async (req, res) => {
  const quizId = req.session.quizId;
  res.status(200).json({ msg: `test quiz berhasil dengan quiz ke ${quizId}` });
};

export const finishQuiz = (req, res) => {
  const quizId = req.session.quizId;
  delete req.session.quizId;
  req.session.quizId = null;
  res.status(200).json({ msg: `session ${quizId} telah dihapus ` });
};

export const getQuiz = async (req, res) => {
  try {
    const response = await Quiz.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getQuizById = async (req, res) => {
  try {
    const response = await Quiz.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createQuiz = async (req, res) => {
  const { name, level, description } = req.body;

  try {
    await Quiz.create({
      name: name,
      level: level,
      description: description,
    });
    res.status(201).json({ msg: "Buat Quiz baru berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateQuiz = async (req, res) => {
  const { name, level, description } = req.body;
  const quiz = await Quiz.findOne({
    where: {
      id: req.params.id,
    },
  });
  try {
    await Quiz.update(
      {
        name: name,
        level: level,
        description: description,
      },
      {
        where: {
          id: quiz.id,
        },
      }
    );
    res.status(200).json({ msg: "Quiz Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteQuiz = async (req, res) => {
  const quiz = await Quiz.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!quiz) return res.status(404).json({ msg: "Quiz tidak ditemukan" });
  try {
    await Quiz.destroy({
      where: {
        id: quiz.id,
      },
    });
    res.status(200).json({ msg: "Quiz Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
