const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { responseData, responseError } = require("../middleware/response");

require("dotenv").config();

exports.createUser = async (req, res) => {
  const regexMail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!(email && password && firstName && lastName)) {
      responseError(res, 400, "Vous devez remplir tout les champs");
    }

    if (!email.match(regexMail)) {
      responseError(res, 400, "L'email n'est pas valide.");
    }

    const oldUser = await UserModel.findOne({ email });

    if (oldUser) {
      responseError(res, 400, "L'utilisateur existe déjà");
    }

    let encryptedPassword = await bcrypt.hash(password, 10);

    const user = UserModel.create({
      email: email.toLowerCase(),
      password: encryptedPassword,
      role: "ROLE_USER",
      firstName,
      lastName,
    });

    const token = jwt.sign({ userId: user._id, email }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });

    user.token = token;

    responseData(res, 201, "User created successfully", user);
  } catch (error) {
    responseError(res, 400, error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      responseError(res, 400, "Vous devez remplir tout les champs");
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      responseError(res, 400, "L'utilisateur n'existe pas");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      responseError(res, 400, "Le mot de passe est incorrect");
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      process.env.TOKEN_KEY,
      { expiresIn: "2h" }
    );

    user.token = token;

    responseData(res, 200, "Connexion successfully", {
      token: user.token,
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    responseError(res, 400, error.message);
  }
};
