import UserRepository from "../data-access/repositories/user-repository.js";
import bcrypt from "bcrypt";
import logger from "../utils/logger.js";

const getUserById = async (id) => {
  return UserRepository.getById(id);
};

/* const getByUsername = async (username) => {
  return UserRepository.getByUsername(username);
}; */
const getByEmail = async (email) => {
  return UserRepository.getOne({ email: email });
};

const getUsers = async () => {
  const users = await UserRepository.getAll();
  return users;
};

const saveUser = async (data) => {
  const user = data;
  //? validar cada dato de arriba ? o no hace falta ya que hace eso en la squema de moongose
  const savedUserId = UserRepository.create(user);
  return savedUserId; //return saved  id?
};

const registerUser = async (userData) => {
  const { password, email, firstName, lastName, phone, avatarUrl } = userData;
  const newUser = {
    //username: username,
    passwordHash: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    email: email,
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    avatarUrl: avatarUrl,
    isAdmin: false,
  };
  const createdUser = await UserRepository.create(newUser);
  logger.info(
    `New Admin created: ${createdUser.firstName + createdUser.lastName}, id: ${
      createdUser._id
    }`
  );
  return createdUser;
};

const registerAdmin = async (userData) => {
  const { password, email, firstName, lastName, phone, avatarUrl } = userData;
  const newUser = {
    //username: username,
    email: email,
    passwordHash: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    avatarUrl: avatarUrl,
    isAdmin: true,
  };
  const createdUser = await UserRepository.create(newUser);
  logger.info(
    `New Admin created: ${createdUser.firstName + createdUser.lastName}, id: ${
      createdUser._id
    }`
  );
  return;
};

const updateUser = async (id, data) => {
  if (!data) {
    throw new Error("update user Data is empty or undefined");
  }
  //Separar en diferentes servicios, para contraseña, correo y nombres
  const updatedUserId = await UserRepository.updateById(id, data);
  return updatedUserId;
};

const deleteUser = async (id) => {
  const deletedUser = await UserRepository.deleteById(id);
  // que no devuelva info sensible
  return deletedUser;
};

export {
  getUsers,
  getUserById,
  //getByUsername,
  getByEmail,
  saveUser,
  updateUser,
  deleteUser,
  registerUser,
  registerAdmin,
};
