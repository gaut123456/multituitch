import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		pseudo: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		userID: {
			type: String,
			required: true,
			unique: true,
		},
		favoris: {
			type: [String],
			default: [],
		},
	},
	{
		timestamps: true,
	},
);

const User = mongoose.model("User", userSchema);

export default User;
