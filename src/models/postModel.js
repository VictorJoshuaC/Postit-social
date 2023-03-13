const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      content: {
        type: String,
        required: true
      },
      isDeleted: {
        type: Boolean,
        default: false
      },
      replies: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
          },
          content: {
            type: String,
            required: true
          },
          isDeleted: {
            type: Boolean,
            default: false
          }
        }
      ]
    }
  ],
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;