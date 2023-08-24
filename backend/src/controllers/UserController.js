const { Op } = require("sequelize");
const User = require("../models/User");
const Auth = require("../config/Auth");

const index = async (req, res) => {
  try {
    const user = await User.findAll();
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const show = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const create = async (req, res) => {
  try {


    const { password } = req.body;
    const HashSalt = Auth.generatePassword(password);
    const salt = HashSalt.salt;
    const hash = HashSalt.hash;
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      hash: hash,
      salt: salt,
    };
    const user = await User.create(newUser);
    return res
      .status(201)
      .json({ msg: "User successfully registered", user: user });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await User.update(req.body, { where: { id: id } });
    if (updated) {
      const user = await User.findByPk(id);
      return res.status(200).send(user);
    }
    throw new Error();
  } catch (err) {
    return res.status(500).json("User not found");
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await User.destroy({ where: { id: id } });
    if (deleted) {
      return res.status(200).json("User successfully deleted.");
    }
    throw new Error();
  } catch (err) {
    return res.status(500).json("User not found.");
  }
};

module.exports = {
  update,
  destroy,
  create,
  index,
  show,
};
