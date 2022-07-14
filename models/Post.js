import mongoose from "mongoose";

/** 7.1 создание модели статьи */
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
      unique: true,
    },
    tags: {
      type: Array,
      default: [],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    /** relationship - создаем связь с таблицей ользователей через id пользователя */
    /** ссылаемся на модель пользователя и вытаскиваем по mongoose.SchemaTypes.ObjectId нужного пользователя */
    user: {
      type: mongoose.SchemaTypes.ObjectId, // специальный тип
      ref: "User",
      unique: true,
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", PostSchema);
