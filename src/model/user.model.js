import mongoose, {Schema} from 'mongoose';

const userSchema = new Schema({

    userName: {
        type: String, 
        required: true, 
        trim: true,
        unique: unique, 
        index: true, 
    }, 

    email: {
        type:String, 
        required: true, 
        trim: true,
        unique: true, 
        lowercase: true, 
        index: true
    }, 

    fullName:{
        type: String, 
        trim: true,
        required: false, 
    }, 

    avatar: {                   // using cloudinary URL so the data type is string 
        type: String, 
        required: false
    }, 

    coverImage: {               // using cloudinary URL so the data type is string, 
        type: String, 
        required: true
    }, 

    watchHistory: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Video"
    }], 

    password: {
        type: String, 
        required: [true, " Password is required "]
    }, 

    refereshToken:{
        type: String
    }

}, {timestamps: true})

export const User = mongoose.model("User", userSchema)