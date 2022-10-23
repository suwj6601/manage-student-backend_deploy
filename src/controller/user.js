const bcrypt = require('bcrypt');
const { RESPONSE_CODE } = require("../constant");
const {
    getUserByUserName,
    createUser,
    generateAuthToken
} = require("../service/user");

const signInController = async (req, res) => {
    const { username, password } = req.body;

    const user = await getUserByUserName(username);

    if (!user) {
        res.send({
            code: RESPONSE_CODE.OBJECT_NOT_FOUND,
            message: `Can not find user with @username ${username}`,
        });
        return;
    }

    const isTruePassword = await bcrypt.compare(password, user?.password);
    if (!isTruePassword) {
        res.send({
            code: RESPONSE_CODE.INVALID_BODY,
            message: "Password is not correct",
        });
        return;
    }

    res.send({
        code: RESPONSE_CODE.SUCCESS,
        message: "Login successful",
        token: generateAuthToken(user?.username)
    });
};

const registerAccount = async (req, res) => {
    const { username, password } = req.body;

    const user = await getUserByUserName(username);
    // can not create user if user existed
    if (user) {
        res.send({
            code: RESPONSE_CODE.OBJECT_EXIST,
            message: `Account with @username ${username} already exists`,
        });
        return;
    }

    await createUser({ username: username, password: password });

    res.send({
        code: RESPONSE_CODE.SUCCESS,
        message: `Create account successfully`,
    });
};

module.exports = {
    signInController,
    registerAccount
};