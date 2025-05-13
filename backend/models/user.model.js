import mongoose from "mongoose"
const userSchema=mongoose.Schema({
    fullname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true
    },
    confirmpassword: {
        type: String
    }
},{timestamps: true});
// timestamps createdAt and UpdatedAt
const user=mongoose.model("User",userSchema);
export default user;