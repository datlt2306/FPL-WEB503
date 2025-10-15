import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
        },
        comments: [
            {
                title: {
                    type: String,
                },
                content: {
                    type: String,
                },
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

postSchema.plugin(mongoosePaginate);
const Post = mongoose.model("Post", postSchema);
export default Post;

// Post.find(); => [{}]
