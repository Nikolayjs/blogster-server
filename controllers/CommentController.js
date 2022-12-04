import CommentModel from "../models/Comment.js";

export const getAll = async (req, res) => {
  try {
    const comments = await CommentModel.find().populate("user").exec();
    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось загрузить статьи",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const commentId = req.params.id;
    CommentModel.findByIdAndDelete(
      {
        _id: commentId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: "Не удалось удалить комментарий",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "Комментарий не найден",
          });
        }
        res.status({
          success: true,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось загрузить комментарий",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new CommentModel({
      content: req.body.content,
      postId: req.params.id,
      user: req.userId,
    });
    const post = await doc.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать комментарий",
    });
  }
};

export const update = async (req, res) => {
  try {
    const commentId = req.params.id;
    await CommentModel.updateOne(
      {
        _id: commentId,
      },
      {
        content: req.body.content,
        user: req.userId,
      }
    );
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить комментарий",
    });
  }
};
