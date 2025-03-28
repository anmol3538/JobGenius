import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import validator from "validator"
import { type } from "os";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide valid Email"]
    },
    phone: {
        type: Number,
        required: true,
    }, 
    address: {
        type: String,
        required: true,
    }, 
    niches: {
        firstNiche: String,
        secondNiche: String,
        thirdNiche: String
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password must contain at least 8 characters"],
        select: false,
    },
    resume: {
        public_id: String,
        url: String
    },
    coverletter: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ["candidate", "recruiter"],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})
userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

export const User = mongoose.model("User", userSchema);