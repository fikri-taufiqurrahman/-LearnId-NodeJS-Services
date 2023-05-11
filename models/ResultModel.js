import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Results = db.define(
  "results",
  {
    quiz: {
      type: DataTypes.STRING,
    },
    result: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

Users.hasMany(Results);
Results.belongsTo(Users, { foreignKey: "id" });

export default Results;
