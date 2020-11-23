import { model, Document, Schema } from 'mongoose';

interface User extends Document {
    name: string;
    email: string;
}

const schemaUser = new Schema({

    name: {
        type: String,
        trim: true,
        required: true
    },

    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    }

}, { timestamps: true });

export default model<User>('user', schemaUser);

