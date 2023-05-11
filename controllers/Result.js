import Result from "../models/ResultModel.js";

//user
export const postResult = async (req, res) => {
  const { quiz, answer } = req.body;
  try {
    const dataQuestions = await Questions.findAll({
      attribute: ["id", "right_answer"],
    });

    let result;

    for (let i = 0; i < dataQuestions.length; i++) {
      if (dataQuestions[i].right_answer == answer[i]) {
        result += 10;
      } else {
        result = result;
      }
    }
    try {
      await Result.create({
        quiz: quiz,
        result: result,
        userId: req.userId,
      });
      res.status(201).json({ msg: "Buat Hasil baru berhasil" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
    res.status(200).json({ msg: "Post Result berhasil" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//user
export const getResult = async (req, res) => {
  try {
    const response = await Result.findAll({
      where: {
        userId: req.userId,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//user
export const getResultById = async (req, res) => {
  try {
    const result = await Result.findOne({
      where: {
        [Op.and]: [{ id: req.params.id }, { userId: req.userId }],
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//admin
export const updateResult = async (req, res) => {
  const { quiz, result } = req.body;

  try {
    await Result.update(
      {
        quiz: quiz,
        result: result,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Result Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//admin
export const deleteResult = async (req, res) => {
  const result = await Result.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!result) return res.status(404).json({ msg: "Result tidak ditemukan" });
  try {
    await Result.destroy({
      where: {
        id: result.id,
      },
    });
    res.status(200).json({ msg: "Result Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
