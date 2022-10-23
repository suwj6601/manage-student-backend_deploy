const { RESPONSE_CODE } = require("../constant");
const { getAllStudentByClassId } = require("../service/student");
const {
  getAllClass,
  createClass,
  updateClass,
  deleteClass,
  getIdClass,
} = require("../service/class");

const getAllClassController = async (req, res) => {
  const { user } = req;
  console.log('user from controller', user);

  const listData = await getAllClass();

  res.send({
    code: RESPONSE_CODE.SUCCESS,
    message: "Get all class successful",
    data: listData,
  });
};

const createClassController = async (req, res) => {
  const { id, name, numberOfStudent } = req.body;

  if (id === undefined) {
    res.send({
      code: RESPONSE_CODE.INVALID_BODY,
      message: "@id can not be empty",
    });
  }

  const result = await createClass({ numberOfStudent, id, name });

  res.send({
    code: RESPONSE_CODE.SUCCESS,
    message: "Create class successful",
    data: result,
  });
};

const updateClassController = async (req, res) => {
  const { id, name, numberOfStudent } = req.body;

  if (id === undefined) {
    res.send({
      code: RESPONSE_CODE.INVALID_BODY,
      message: "@id can not be empty",
    });
  }

  const results = await updateClass({ id, name, numberOfStudent });

  res.send({
    code: RESPONSE_CODE.SUCCESS,
    message: "Update class successful",
    data: results,
  });
};

const deleteClassController = async (req, res) => {
  const { classdId } = req.params;

  if (classdId === undefined) {
    res.send({
      code: RESPONSE_CODE.INVALID_BODY,
      message: "@classdId can not be empty",
    });
  }

  const results = await deleteClass({ classdId });

  res.send({
    code: RESPONSE_CODE.SUCCESS,
    message: "Delete class successful",
    data: results,
  });
};

const getAllStudentClassController = async (req, res) => {
  const { classID } = req.params;

  if (classID === undefined) {
    res.send({
      code: RESPONSE_CODE.INVALID_BODY,
      message: "@classID can not be empty",
    });
  }
  const listClass = await getAllStudentByClassId(classID);

  res.send({
    code: RESPONSE_CODE.SUCCESS,
    message: "Get all student in class successful",
    data: listClass,
  });
};

//get list id class
const getIdClassController = async (req, res) => {
  const results = await getIdClass();
  res.send({
    code: RESPONSE_CODE.SUCCESS,
    message: "Get list id class successful",
    data: results,
  });
};

module.exports = {
  getAllClassController,
  createClassController,
  updateClassController,
  deleteClassController,
  getAllStudentClassController,
  getIdClassController,
};
