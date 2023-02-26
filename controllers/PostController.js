import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось загрузить статьи',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        returnDocument: 'after',
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: 'Не удалось загрузить статью',
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: 'Статья не найдена',
          });
        }
        res.json(doc);
      }
    ).populate('user');
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось загрузить статью',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findByIdAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: 'Не удалось удалить статью',
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: 'Статья не найдена',
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
      message: 'Не удалось загрузить статью',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl ? req.body.imageUrl : '/uploads/anonymus.jpg',
      user: req.userId,
      isCourse: req.body.isCourse,
      courseTitle: req.body.courseTitle,
    });
    const post = await doc.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать статью',
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl ? req.body.imageUrl : '/uploads/anonymus.jpg',
        user: req.userId,
        isCourse: req.body.isCourse,
        courseTitle: req.body.courseTitle,
      }
    );
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить статью',
    });
  }
};

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();
    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);
    const uniqueTags = [...new Set(tags)];
    res.json(uniqueTags);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не удалось загрузить теги',
    });
  }
};

export const getAllTags = async (req, res) => {
  try {
    const posts = await PostModel.find().exec();
    const tags = posts.map((obj) => obj.tags).flat();
    const uniqueTags = [...new Set(tags)];
    res.json(uniqueTags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось загрузить теги',
    });
  }
};
