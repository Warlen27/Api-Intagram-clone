const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    description: String,
    thumbnail: String,
    likes: {
        type: Number,
        default: 0,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
     
}, {
  timestamps: true,
  toObject: {
		virtuals: true
	},
	toJSON: {
		virtuals: true
	},  
});

PostSchema.virtual('thumbnail_url').get(function () {
	 
	return `http://localhost:3333/files/${this.thumbnail}`;
});

module.exports = mongoose.model('Post', PostSchema);