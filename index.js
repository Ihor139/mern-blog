import express from "express";
import mongoose from "mongoose";

import checkAuth from "./utils/checkAuth.js";

import {
  loginValidation,
  postCreateValidation,
  registerValidation,
} from "./validations/validation.js";

import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";
import {remove} from "./controllers/PostController.js";

/** 3 подключение к базе данных */
mongoose.connect("mongodb+srv://admin:qqqwww@cluster0.nymgd.mongodb.net/blog?retryWrites=true&w=majority")
  .then(() => {
    console.log("db ok");
  })
  .catch((err) => {
    console.log("db error: " + err);
  });

/** 1 создание приложения app express */
const app = express();

app.use(express.json());

/** 2 установка слушателя порта */
app.listen(4444, (err) => {
  if (err) return console.log(err);

  console.log("server ok");
});

/** список роутов */

/** роуты для авторизации */

/** 5 авторизация пользователя  */
app.post("/login", loginValidation, UserController.login);

/** 4 регистрация нового пользователя */
app.post("/register", registerValidation, UserController.register);

/** 6 получение информации о себе */
app.get("/me", checkAuth, UserController.getMe);


/** 7 роуты для статтей */
app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, PostController.create);
app.patch("/posts/:id", checkAuth, PostController.update);
app.delete("/posts/:id", checkAuth, PostController.remove);
