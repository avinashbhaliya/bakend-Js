
// import mongoose, {Schema} from "mongoose"
// const userSchema = new Schema({})  

import mongoose from "mongoose";
import JsonWebTokenError from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            index: true,
            trim: true
        },
        email: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullName: {
            type: String,
            require: true,
            index: true,
            trim: true
        },
        avtar: {
            type: String,//cloudanary url
            required: true,
        },
        coverImage: {
            type: String,//cloudanary url
        },
        watchHistory: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            require: [true, "Password is required"]
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }

)

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}



export const User = mongoose.model("User", userSchema)

