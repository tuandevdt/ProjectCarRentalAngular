const { where } = require("sequelize");
const { resErrors, resData } = require("../common/common");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { error } = require("console");
const {login, register} = require("../../service/authService");

class ApiAuthController {
  static async login(req, res) {
    try {
      const {email, password} = req.body;
      const data = await login(email, password);
      res.json(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      resErrors(res, 500, error.message || "Internal Server Error");
    }
  }

  static async create(req, res) {
    try {
      let { username, password, email } = req.body;
      let data = await register( username, password, email);
      console.log(data);
      
      if(data.status == 200) {
        resData(res, 201, data.message);
      } else {
        resErrors(res, 401, data.message)
      }
    } catch (error) {
      console.error("Error creating user:", error);
      resErrors(res, 500, error.message || "Internal Server Error");
    }
  }

  
  static newToken(req, res) {
    try {
      const { refreshToken } = req.body;   
      if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
      }
  
      jwt.verify(refreshToken, "TuanDevRefreshToken", (err, user) => {
        if (err) {
          return res.status(403).json({ message: "Invalid refresh token" });
        }
  
        const accessToken = jwt.sign(
          {
            id: user.dataValues.id,
            username: user.dataValues.username,
          },
          "TuanDevAccessToken",
          { expiresIn: "1h" }
        );
  
        return res.json({ accessToken });
      });
    } catch (error) {
      console.error("Error refreshing token:", error);
      resErrors(res, 500, error.message || "Internal Server Error");
    }
  }
}
module.exports = ApiAuthController;
