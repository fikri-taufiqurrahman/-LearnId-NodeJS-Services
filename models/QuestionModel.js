import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Quiz from "./QuizModel.js";
import Users from "./UserModel.js";
const { DataTypes } = Sequelize;

const Questions = db.define(
  "Questions",
  {
    question: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    first_answer: {
      type: DataTypes.STRING,
    },
    second_answer: {
      type: DataTypes.STRING,
    },
    third_answer: {
      type: DataTypes.STRING,
    },
    fourth_answer: {
      type: DataTypes.STRING,
    },
    right_answer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);
Quiz.hasMany(Questions);
Questions.belongsTo(Users, { foreignKey: "id" });
export default Questions;
