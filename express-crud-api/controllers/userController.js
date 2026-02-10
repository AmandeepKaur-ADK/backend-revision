const users = require("../data/MOCK_DATA.json");

const getAllUsers = (req, res) => {
  return res.status(200).json(users);
};

const getUserById = (req, res) => {
  const userID = parseInt(req.params.id);
  const user = users.find((user) => parseInt(user.id) === userID);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json(user);
};

const deleteUser = (req, res) => {
  const userID = parseInt(req.params.id);
  const index = users.findIndex((user) => parseInt(user.id) === userID);
  if (index == -1) {
    return res.status(404).json({ message: "User not found" });
  }
  users.splice(index, 1);
  return res.status(200).json({ message: `Deleted Successfully ` });
};

const editUser = (req, res) => {
  const userID = parseInt(req.params.id);
  const user = users.find((user) => parseInt(user.id) === userID);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const { first_name, last_name, email, gender } = req.body;
  if (first_name !== undefined) user.first_name = first_name;
  if (last_name !== undefined) user.last_name = last_name;
  if (email !== undefined) user.email = email;
  if (gender !== undefined) user.gender = gender;
  return res.status(200).json({ message: "User updated", user });
};

module.exports = {
  getAllUsers,
  getUserById,
  editUser,
  deleteUser,
};
