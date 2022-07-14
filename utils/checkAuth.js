import jwt from "jsonwebtoken";

/** 6.1 middleware, проверяем можно ли возвращать пользователю информацию о себе */
export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      /** расшифруем токен */
      const decoded = jwt.verify(token, "secret321");

      req.userId = decoded._id;

      /** next() запускает следующую функцию (res())*/
      next();
    } catch (error) {
      return res.status(403).json({
        message: "Нет доступа",
      });
    }
  } else {
    return res.status(403).json({
      message: "Нет доступа",
    });
  }
};
