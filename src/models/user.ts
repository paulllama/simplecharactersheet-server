import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String, // hash it
    createdAt: Date,
    updatedAt: Date
});

export default mongoose.model('User', userSchema)
