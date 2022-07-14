import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

import UserModel from "../models/User.js";

/** 5.2 авторизация пользователя  */
export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(400).json({ message: "Неверный логин или пароль" });
    }

    /** генерация нового токена */
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret321",
      {
        expiresIn: "20d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ userData, token });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Не удалось авторизироваться",
    });
  }
};

/** 4.2 регистрация нового пользователя */
export const register = async (req, res) => {
  /** обработаем ошибки в try catch */
  try {
    /** валидация данных запроса */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    /** шифрования пароля на стороне сервера с помощью bcrypt*/
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    /** создание нового пользователя в базе данных*/
    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    /** сохраняем пользователя в базу данных*/
    const user = await doc.save();

    /** генерация нового токена */
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret321",
      {
        expiresIn: "20d",
      }
    );

    /** только один ответ */

    const { passwordHash, ...userData } = user._doc;

    res.json({ userData, token });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Не удалось зарегистрироваться",
    });
  }
};

/** 6.2 получение информации о себе */
export const getMe = async (req, res) => {
  /** обработаем ошибки в try catch */
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "",
    });
  }
};
