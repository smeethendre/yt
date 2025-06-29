import mongoose, {Schema} from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

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

videoSchema.plugin(mongooseAggregatePaginate) 

// Why Use Plugins?
// Plugins help you:

// Avoid writing the same logic in every schema (DRY principle)

// Reuse modular features across different models

// Add advanced capabilities with one line (like soft delete, slug generation, pagination, etc.)

export const Video = mongoose.model("Video", videoSchema)