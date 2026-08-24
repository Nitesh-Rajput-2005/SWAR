import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    otpHash: {
        type: String,
        default: null
    },

    otpExpiresAt: {
        type: Date,
        default: null
    },

    otpAttempts: {
        type: Number,
        default: 0
    }
});

const user = mongoose.model("user", userschema);

export default user;