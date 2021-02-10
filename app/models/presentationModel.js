import mongoose from 'mongoose';
import validator from 'validator';

const Schema = mongoose.Schema;

const presentationSchema = new Schema({
    name:{
        type: String,
        trim: true,
        lowercase: true
      },
      description: {
        type: String,
        trim: true,
        lowercase: true
      },
      category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
      },
});

const Presentation = mongoose.model('presentation', presentationSchema);

export default Presentation;