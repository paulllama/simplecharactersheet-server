import mongoose from 'mongoose'

export interface BlockType {
    name: string,
    blockType: "list" | "boxes" | "blocks" | "parent",
    hideName?: boolean,
    description?: string,
    editDescription?: string,
    items?: Array<string>,
    showItemAdditionalInfo?: boolean,
    count?: number,
    labels?: Array<string>,
    children?: Array<BlockType>,
}

export interface GameType {
    name: string,
    code: string,
    link: string,
    stats: {
        range: {
            min: number,
            max: number,
        },
        defaultValue: number,
        names: Array<string>,
    },
    sheetTemplate: Array<BlockType>,
}

const gameSchema: mongoose.Schema = new mongoose.Schema<GameType>({
    name: { type: String, required: true },
    code: { type: String, required: true },
    link: { type: String, required: true },
    stats: {
        range: {
            min: { type: Number, required: true },
            max: { type: Number, required: true },
        },
        defaultValue: { type: Number, required: true },
        names: {
            type: [String],
            required: true,
        },
        // rollOptions: {} // TODO
    },
    sheetTemplate: [{
        name: { type: String, required: true },
        blockType: {
            type: String,
            enum: ["list", "boxes", "blocks", "parent"],
            required: true,
        },
        hideName: Boolean,
        description: String,
        editDescription: String,
        items: [String],
        showItemAdditionalInfo: Boolean,
        count: Number,
        labels: [String],
        children: [{}],
    }],
});

export default mongoose.model<GameType>('Game', gameSchema)
