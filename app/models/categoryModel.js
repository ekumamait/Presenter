import mongoose from 'mongoose';
import validator from 'validator';

const Schema = mongoose.Schema;

const categorySchema = new Schema({
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
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
});

const Category = mongoose.model('category', categorySchema);

export default Category;