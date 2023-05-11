import Questions from "../models/QuestionModel.js";

//user
export const getQuestions = async (req, res) => {
  try {
    const response = await Questions.findAll({
      attribute: [
        "id",
        "questions",
        "first_answer",
        "second_answer",
        "thrid_answer",
        "forth_answer",
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getQuestionsById = async (req, res) => {
  try {
    const response = await Questions.findOne({
      attribute: [
        "id",
        "questions",
        "first_answer",
        "second_answer",
        "thrid_answer",
        "forth_answer",
      ],
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createQuestions = async (req, res) => {
  const {
    question,
    first_answer,
    second_answer,
    third_answer,
    fourth_answer,
    right_answer,
  } = req.body;

  try {
    await Questions.create({
      question: question,
      first_answer: first_answer,
      second_answer: second_answer,
      third_answer: third_answer,
      fourth_answer: fourth_answer,
      right_answer: right_answer,
      quizId: req.quizId,
    });
    res.status(201).json({ msg: "Buat Question baru berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateQuestions = async (req, res) => {
  const {
    question,
    first_answer,
    second_answer,
    third_answer,
    fourth_answer,
    right_answers,
  } = req.body;
  const questionData = await Questions.findOne({
    where: {
      id: req.params.id,
    },
  });
  try {
    await Questions.update(
      {
        question: question,
        first_answer: first_answer,
        second_answer: second_answer,
        third_answer: third_answer,
        fourth_answer: fourth_answer,
        right_answers: right_answers,
      },
      {
        where: {
          id: questionData.id,
        },
      }
    );
    res.status(200).json({ msg: "Questions Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteQuestions = async (req, res) => {
  const question = await Questions.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!question)
    return res.status(404).json({ msg: "Question tidak ditemukan" });
  try {
    await Questions.destroy({
      where: {
        id: question.id,
      },
    });
    res.status(200).json({ msg: "Question Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
