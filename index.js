import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import {
  UserController,
  NoteController,
  PostController,
} from "./controllers/index.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import { validationResult } from "express-validator";
import * as validation from "./validations.js";
import fs from "fs";

mongoose
  .connect(
    "mongodb+srv://nikolas:q9e7t5kol9mad@cluster0.yd7u5br.mongodb.net/advanced-todos?retryWrites=true&w=majority"
  )
  .then(() => console.log("Db OK"))
  .catch((err) => console.log("Db err", err));
const app = express();
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.post(
  "/auth/login",
  validation.loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  validation.registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);
app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});
app.get("/ntags", NoteController.getLastTags);
app.get("/notes", NoteController.getAll);
app.get("/notes/:id", NoteController.getOne);

app.post(
  "/notes",
  checkAuth,
  validation.notesValidation,
  handleValidationErrors,
  NoteController.create
);
app.delete("/notes/:id", checkAuth, NoteController.remove);
app.patch(
  "/notes/:id",
  checkAuth,
  validation.notesValidation,
  handleValidationErrors,
  NoteController.update
);
app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.get("/ptags", PostController.getLastTags);
app.post(
  "/posts",
  checkAuth,
  validation.postsValidation,
  handleValidationErrors,
  PostController.create
);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  validation.postsValidation,
  handleValidationErrors,
  PostController.update
);
app.patch("/user/:id", UserController.update);
app.listen(process.env.PORT || 4000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server ok");
});
