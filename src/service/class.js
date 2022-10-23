const { db } = require("./db");

const getAllClass = async (req, res) => {
  try {
    const [rows, fields] = await db.promise().query("SELECT * FROM class");
    return rows;
  } catch (err) {
    throw new Error(err);
  }
};

const createClass = async (data) => {
  try {
    const { id, name, numberOfStudent } = data;

    const [rows, fields] = await db
      .promise()
      .query("INSERT INTO class (id, name, numberOfStudent) values(?,?,?)", [
        id,
        name,
        numberOfStudent,
      ]);

    return rows;
  } catch (err) {
    throw new Error(err);
  }
};

const updateClass = async (data) => {
  try {
    const { id, name, numberOfStudent } = data;

    const [rows, fields] = await db
      .promise()
      .query(`UPDATE class set name = ?, numberOfStudent = ? where id = ?;`, [
        name,
        numberOfStudent,
        id,
      ]);

    return rows;
  } catch (err) {
    throw new Error(err);
  }
};

const deleteClass = async (data) => {
  try {
    const { classdId } = data;

    const [rows, fields] = await db
      .promise()
      .query(`delete from class where id = (?);`, [classdId]);

    return rows;
  } catch (err) {
    throw new Error(err);
  }
};

const getIdClass = async () => {
  try {
    const [rows, fields] = await db.promise().query("SELECT id FROM class");

    return rows;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getAllClass,
  createClass,
  updateClass,
  deleteClass,
  getIdClass,
};
