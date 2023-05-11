import { Sequelize } from "sequelize";

const db = new Sequelize("psm-alif", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
