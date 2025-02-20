import mongoose from 'mongoose'

const gameSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true },
    icon: { type: String, required: true },
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

export default mongoose.model('Game', gameSchema)
