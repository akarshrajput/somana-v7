// models/Blog.js
import mongoose from "mongoose";
import User from "./userModel"; // Ensure the User model is imported

const blogSchema = new mongoose.Schema(
  {
    usedAI: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      unique: true,
    },
    heading: {
      type: String,
      trim: true,
      required: [true, "Blog must have a heading"],
      minlength: [10, "Heading must have more than 10 characters."],
      maxlength: [100, "Heading must have less than 100 characters."],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Blog must have a description"],
      minlength: [20, "Description must have more than 20 characters."],
      maxlength: [300, "Description must have less than 300 characters."],
    },
    content: {
      type: String,
      maxlength: [200000, "Content must have less than 40,000 characters."],
    },
    featuredImage: {
      type: String,
      default: "default-blog.jpg",
    },
    collectedImages: [
      {
        type: String,
      },
    ],
    tags: {
      type: String,
      minlength: [2, "Tag is not valid."],
      maxlength: [60, "Tag must have less than 60 characters."],
    },
    genre: {
      type: String,
      trim: true,
      minlength: [3, "Genre must have more than 3 characters."],
      maxlength: [50, "Genre must have less than 50 characters."],
    },
    source: {
      type: String,
      trim: true,
      minlength: [3, "Source must have more than 3 characters."],
      maxlength: [100, "Source must have less than 100 characters."],
    },
    views: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Blog must have an author"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

blogSchema.pre(/^find/, function (next) {
  this.populate({
    path: "author",
    select: "name userName photo verified accountType occupation",
  });
  next();
});

blogSchema.pre("save", function (next) {
  const s = this.heading.split(" ").join("-").toLowerCase();
  const id = this._id;
  const u = `${s.substring(0, 40)}-${id}`;
  const m = u.replace(/[^a-zA-Z0-9-]/g, "");
  this.slug = m;
  next();
});

blogSchema.virtual("readTime").get(function () {
  const wordsPerMinute = 200; // Average reading speed
  const words = this.content ? this.content.split(/\s+/).length : 0;
  const readTimeMinutes = Math.ceil(words / wordsPerMinute);
  return readTimeMinutes;
});

blogSchema.virtual("numberOfViews").get(function () {
  return this.views.length;
});

blogSchema.virtual("numberOfLikes").get(function () {
  return this.likes.length;
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
