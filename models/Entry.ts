import mongoose from "mongoose";

const EntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 50,
  },
  body: {
    type: String,
    maxlength: 2000,
    required: true,
  },
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  blog: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
});
