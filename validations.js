import { body } from "express-validator";

export const registerValidation = [
  body("email", "Почта указана неверно").isEmail(),
  body("password", "Пароль должен содержать 5 символов").isLength({ min: 5 }),
  body("fullName", "Должно содержать хотя бы 2 символа").isLength({ min: 2 }),
  body("avatarUrl", "Неверная ссылка").optional().isURL(),
];

export const loginValidation = [
  body("email", "Почта указана неверно").isEmail(),
  body("password", "Пароль должен содержать 5 символов").isLength({ min: 5 }),
];

export const notesValidation = [
  body("title", "Введите заголовок").isLength({ min: 3 }).isString(),
  body("content", "Введите текст заметки").isLength({ min: 5 }).isString(),
  body("tags", "Неверный формат тегов").optional(),
  body("imageUrl", "Неверная ссылка").optional().isString(),
];
export const postsValidation = [
  body("title", "Введите заголовок").isLength({ min: 5 }).isString(),
  body("content", "Введите текст статьи").isLength({ min: 10 }).isString(),
  body("tags", "Неверный формат тегов").optional(),
  body("imageUrl", "Неверная ссылка").optional().isString(),
];
