import mongoose from 'mongoose'
import type { BlockType } from './game';

export interface SheetType {
    name: string,
    icon: string,
    gameId: mongoose.Types.ObjectId,
    description: string,
    templateBlocks: {
        [name: string]: BlockType,
    }
    blocks: Array<BlockType>,
}

const sheetSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true },
    icon: { type: String, required: true },
    gameId: { type: mongoose.Types.ObjectId, required: true },
    description: { type: String, required: true },
    templateBlocks: { type: {}, required: true },
    blocks: { required: true, type: [{}] },
});

export default mongoose.model<SheetType>('Sheet', sheetSchema)
