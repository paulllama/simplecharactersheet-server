import mongoose from 'mongoose'

const characterSchema: mongoose.Schema = new mongoose.Schema({
    name: String,
    sheetId: String,
    gameId: String,
    userId: String,
    blocks: {},
});

export default mongoose.model('Character', characterSchema)
