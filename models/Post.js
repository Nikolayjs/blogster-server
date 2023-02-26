import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
    imageUrl: {
      type: String,
      default: "/anonymus.jpg",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isCourse: {
      type: Boolean,
      default: false,
    },
    courseTitle: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Post", PostSchema);
