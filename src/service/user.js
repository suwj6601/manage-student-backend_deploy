const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db } = require("./db");
require("dotenv").config();

const getUserByUserName = async (username) => {
    try {
        const [rows, fields] = await db
            .promise()
            .query(`select * from user where username = (?);`, [username]);

        return rows?.[0];
    } catch (err) {
        throw new Error(err);
    }
};

const createUser = async (data) => {
    const { username, password } = data;

    try {
        const decodedPassword = await generatePassword(password);
        const [rows, fields] = await db
            .promise()
            .query("INSERT INTO user values(?,?)", [
                username,
                decodedPassword
            ]);

        return rows;
    } catch (err) {
        throw new Error(err);
    }
};

const generatePassword = async (password) => {
    const decodedPassword = await bcrypt.hash(password, 10);
    return decodedPassword;
};

const generateAuthToken = (data) => {
    const token = jwt.sign({ user: data }, process.env.PRIVATE_KEY_JWT, { expiresIn: 10 * 60 }); // expire in 10 minutes
    return token;
};

const validateAuthToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY_JWT);
        return decoded;
    } catch (err) {
        throw new Error(err);
    }
};

const getUserFromToken = async (token) => {
    try {
        let user;
        if (!token) {
            return user;
        }

        const decodedData = await validateAuthToken(token);
        if (decodedData) {
            user = await getUserByUserName(decodedData?.user);
        }

        return user;
    } catch {
        return null;
    }
};

module.exports = {
    getUserByUserName,
    createUser,
    generateAuthToken,
    validateAuthToken,
    getUserFromToken
};