import userService from '../services/userService.js';

const registerHandler = async (req, res, next) => {
  try {
    const result = await userService.registerService(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const loginHandler = async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await userService.loginService(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getUserByIdHandler = async (req, res, next) => {
  try {
    const { username } = req.user;
    const result = await userService.getUserByUsername(username);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default { registerHandler, loginHandler, getUserByIdHandler };
