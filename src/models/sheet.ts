import mongoose from 'mongoose'

const sheetSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true },
    icon: { type: String, required: true },
    gameId: { type: mongoose.Types.ObjectId, required: true },
    description: String,
    templateBlocks: {},
    blocks: {},
});

export default mongoose.model('Sheet', sheetSchema)
