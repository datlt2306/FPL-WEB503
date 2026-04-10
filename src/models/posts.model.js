import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model('Post', postSchema);