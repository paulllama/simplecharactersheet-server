import mongoose from 'mongoose'
import Game from './game'
import Sheet from './sheet'
import type { BlockType, GameType } from './game'

export interface CharacterType {
    _id: mongoose.Types.ObjectId,
    name?: string,
    sheetId?: string,
    gameId: string,
    userId: string,
    blocks: Array<BlockType>,
}

const characterSchema: mongoose.Schema = new mongoose.Schema({
    name: String,
    sheetId: String,
    gameId: { type: String, required: true },
    userId: { type: String, required: true },
    blocks: { type: [], required: true },
})

export default mongoose.model<CharacterType>('Character', characterSchema)
