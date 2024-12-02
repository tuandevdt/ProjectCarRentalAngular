const { where } = require("sequelize");
const { resErrors, resData } = require("./common/common");
const db = require("../models/index");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const salt = bcrypt.genSaltSync(10);

class ApiAdminUserController {
  static async index(req, res) {
    try {
      let users = await db.User.findAll();
      let message = "Get data User Car Rental successfully";
      resData(res, 200, message, users);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
}
module.exports = ApiAdminUserController;
