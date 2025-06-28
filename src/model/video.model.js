import mongoose, {Schema} from 'mongoose';

const videoSchema = new Schema({


    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    }, 

    videoFile: {                    // using cloudinary URL so the data type is string, 
        type: String, 
        required: [true, "UPload the required video file"] 
    }, 

    thumbNail: {
        type: String, 
        required: [true, "Upload the reqwuired thumbmail"]
    }, 

    title: {
        type: String, 
        required: [true, "Enter the title of the video"],
        trim: true
    }, 

    description: {
        type: String, 
        required: false, 
        trim: true
    },

    duration: {
        type: Number, 
        required: true
    }, 

    views: {
        type: Number, 
        required: true,
    }, 

    isPublished: {
        type: Boolean,
        required: true,
    }

}, {timestamps: true})

export const Video = mongoose.model("Video", videoSchema)