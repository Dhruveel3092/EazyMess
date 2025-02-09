import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        desctiption: {
            type: String,
        },
        file: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

const Notice = mongoose.model("Notice", noticeSchema);

export default Notice;