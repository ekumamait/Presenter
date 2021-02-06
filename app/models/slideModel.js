import mongoose from 'mongoose';
import validator from 'validator';

const Schema = mongoose.Schema;

const slideSchema = new Schema({
    slide:{
        type: String,
        trim: true,
        lowercase: true
      },
    presentation: {
        type: mongoose.Schema.ObjectId,
        ref: 'Presentation',
      }
});

const Slide = mongoose.model('slide', slideSchema);

export default Slide;