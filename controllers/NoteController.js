import NoteModel from "../models/Note.js";

export const getAll = async (req, res) => {
  try {
    const notes = await NoteModel.find().populate("user").exec();
    res.json(notes);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось загрузить заметки",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const noteId = req.params.id;
    NoteModel.findOneAndUpdate(
      {
        _id: noteId,
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: "Не удалось загрузить заметку",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "Заметка не найдена",
          });
        }
        res.json(doc);
      }
    ).populate("user");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось загрузить заметку",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const noteId = req.params.id;
    NoteModel.findByIdAndDelete(
      {
        _id: noteId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: "Не удалось удалить заметку",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "Заметка не найдена",
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
      message: "Не удалось загрузить заметку",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new NoteModel({
      title: req.body.title,
      content: req.body.content,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });
    const note = await doc.save();
    res.json(note);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать заметку",
    });
  }
};

export const update = async (req, res) => {
  try {
    const noteId = req.params.id;
    await NoteModel.updateOne(
      {
        _id: noteId,
      },
      {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        user: req.userId,
      }
    );
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить заметку",
    });
  }
};

export const getLastTags = async (req, res) => {
  try {
    const notes = await NoteModel.find().limit(5).exec();
    const tags = notes
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);
    res.json(tags);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось загрузить теги",
    });
  }
};
