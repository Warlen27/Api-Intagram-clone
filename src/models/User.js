const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true
      },
      avatar: String,
    
}, {
  timestamps: true,  
  toObject: {
		virtuals: true
	},
	toJSON: {
		virtuals: true
	},
});

UserSchema.virtual('avatar_url').get(function (avatar) {
	 
	return `http://localhost:3333/files/${this.avatar || 'placeholder.png'}`;
});

module.exports = mongoose.model('User', UserSchema);