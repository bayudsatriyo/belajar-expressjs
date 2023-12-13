import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import prismaClient from '../application/database.js';
import ResponseError from '../exception/response-error.js';
import { registerUserValidation, logginUserValidation } from '../validation/userValidation.js';
import validate from '../validation/validation.js';

const registerService = async (request) => {
  const user = validate(registerUserValidation, request);

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
  const loginRequest = validate(logginUserValidation, request);

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

export default { registerService, loginService, getUserByUsername };
