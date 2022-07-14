import { body } from "express-validator";

/** валидация данных запроса авторизации с помощью express-validator */

export const registerValidation = [
  body("email", "Пожалуйста, введите корректный email-адрес").isEmail(),
  body("password", "Длина пароля должна быть от 5 символов").isLength({
    min: 5,
  }),
  body("fullName", "Длина имени должна быть от 3 символов").isLength({
    min: 3,
  }),
  body("avatarUrl", "Укажите ссылку на аватарку").optional().isURL(),
];

export const loginValidation = [
  body("email", "Пожалуйста, введите корректный email-адрес").isEmail(),
  body("password", "Длина пароля должна быть от 5 символов").isLength({
    min: 5,
  }),
];

/** валидация данных запроса для создания статтей с помощью express-validator */

export const postCreateValidation = [
  body("title", "Введите заголовок статьи").isLength({ min: 5 }).isString(),
  body("text", "Введите текст статьи").isLength({ min: 10 }).isString(),
  body("tags", "Неверный формат тегов").optional().isString(),
  body("imageUrl", "Укажите ссылку на аватарку").optional().isString(),
];
