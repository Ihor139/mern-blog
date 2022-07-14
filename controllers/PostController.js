import PostModel from "../models/Post.js";

/** 7.2 создание статьи */
export const create = async (req, res, next) => {
  try {
    /** создание статьи в базе данных*/
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    /** сохраняем статью в базу данных*/
    const post = await doc.save();

    /** получаем ответ*/
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось создать статью",
    });
  }
};

/** 7.3 получение всех статтей */

export const getAll = async (req, res) => {
  try {
    /** получаем список постов*/
    // const posts = await PostModel.find()

    /** получаем список постов по связи с пользователем*/
    const posts = await PostModel.find().populate('user').exec();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
};

/** 7.4 получение одной статьи */

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate({
      _id: postId,
    }, {
      $inc: {viewsCount: 1},
    }, {
      returnDocument: 'after'
    }, (err, doc) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Не удалось получить статью",
        });
      }
      if (!doc) {
        return res.status(404).json({
          message: "Статья не найдена",
        })
      }

      res.json(doc);
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
};

/** 7.5 удаление статьи  */

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndDelete({
      _id: postId,
    }, (err, doc) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Не удалось удалить статью",
        });
      }
      if (!doc) {
        return res.status(404).json({
          message: "Статья не найдена",
        })
      }

      res.json({
        success: true
      });
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
};


/** 7.5 обновление статьи  */

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate({
      _id: postId,
    }, {
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    }, (err, doc) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Не удалось обновить статью",
        });
      }
      if (!doc) {
        return res.status(404).json({
          message: "Статья не найдена",
        })
      }

      res.json({
        success: true
      });
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
};

