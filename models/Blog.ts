import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: [50, "Blog titles must be under 50 characters."],
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
});

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
