const express = require('express');
const router = express.Router();

const {authenticateToken} = require("../middlewares/auth");



// Route for adding a comment to a post
router.post('/posts/comment/:id', authenticateToken, async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id;
    const { text } = req.body;
  
    try {
      // Find the post by ID
      const post = await Post.findById(postId);
      if (!post) {
      return res.status(404).json({ message: 'Post not found' });
      }
  
  
      // Create new comment object
      const newComment = {
      user: userId,
      text,
      name: req.user.name,
      avatar: req.user.avatar
      };
  
      // Add comment to post comments array
      post.comments.unshift(newComment);
  
      // Save the post
      await post.save();
  
      // Return the post with the updated comments
      res.json(post);
      } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
      }
});
  
// Route for deleting a comment from a post
router.delete('/posts/comment/:id/:commentId', authenticateToken, async (req, res) => {
    const postId = req.params.id;
    const commentId = req.params.commentId;

    try {
        // Find the post by ID
        const post = await Post.findById(postId);
        if (!post) {
        return res.status(404).json({ message: 'Post not found' });
        }


        // Find the comment by ID
        const comment = post.comments.find((comment) => comment.id === commentId);
        if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if user is authorized to delete the comment
        if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
        }

        // Remove comment from post comments array
        post.comments = post.comments.filter(({ id }) => id !== commentId);

        // Save the post
        await post.save();

        // Return success response
        return res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
});
