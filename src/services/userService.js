import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import prismaClient from '../application/database.js';
import ResponseError from '../exception/response-error.js';
import userValidation from '../validation/userValidation.js';
import validate from '../validation/validation.js';

const registerService = async (request) => {
  const user = validate(userValidation.registerUserValidation, request);

  const countUser = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, 'username alredy exist');
  }

  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: user,
    select: {
      username: true,
      name: true,
    },
  });
};

const loginService = async (request) => {
  console.log(request);
  const loginRequest = validate(userValidation.logginUserValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      username: loginRequest.username,
    },
    select: {
      username: true,
      password: true,
    },
  });

  if (!user) {
    throw new ResponseError(401, 'username atau password salah');
  }

  const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
  if (!isPasswordValid) {
    throw new ResponseError(401, 'username atau password salah');
  }

  const token = uuid().toString();
  return prismaClient.user.update({
    data: {
      token,
    },
    where: {
      username: user.username,
    },
    select: {
      token: true,
    },
  });
};

const getUserByUsername = async (username) => {
  const user = await prismaClient.user.findUnique({
    where: {
      username,
    },
    select: {
      username: true,
      name: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, 'User tidak ditemukan');
  }

  return user;
};

const updateUserByUsername = async (request) => {
  const dataUser = await validate(userValidation.updateUserValidation, request);
  console.log('ini data user:');
  console.log(dataUser);
  const cekUser = await getUserByUsername(dataUser.username);

  if (!cekUser) {
    throw new ResponseError(404, 'username tidak ditemukan silahkan registrasi/login');
  }

  const data = {};

  if (dataUser.name) {
    data.name = dataUser.name;
  }

  if (dataUser.password) {
    data.password = await bcrypt.hash(dataUser.password, 10);
  }

  console.log('ini data :');
  console.log(data);

  const userUpdate = await prismaClient.user.update({
    where: {
      username: dataUser.username,
    },
    data,
    select: {
      username: true,
      name: true,
    },
  });

  if (!userUpdate) {
    throw new ResponseError(404, 'User tidak ditemukan');
  }

  return userUpdate;
};

const logoutService = async (username) => {
  const userName = await validate(userValidation.usernameValidation, username);
  console.log(userName);

  const verifiyUser = await getUserByUsername(userName);

  if (!verifiyUser) {
    throw new ResponseError(404, 'Username tidak ditemukan. silahakan registrasi');
  }

  return prismaClient.user.update({
    where: {
      username: userName,
    },
    data: {
      token: null,
    },
    select: {
      username: true,
    },
  });
};

export default {
  registerService, loginService, getUserByUsername, updateUserByUsername, logoutService,
};
