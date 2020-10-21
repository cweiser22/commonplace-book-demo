import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: [30, "First name must be under 30 characters."],
  },
  lastName: {
    type: String,
    required: true,
    maxlength: [30, "Last name must be under 30 characters."],
  },
  email: {
    type: String,
    required: true,
    maxlength: 100,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
