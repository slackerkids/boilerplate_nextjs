import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      private: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    image: {
      type: String,
    },
    customerId: {
      type: String,
    },
    variantId: {
      type: String,
    },
    hasAccess: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
