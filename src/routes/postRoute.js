const express = require('express');
const router = express.Router();
const Post = require('./models/postModel');

const {authenticateToken} = require("../middlewares/auth");



// Route for creating a new post
router.post('/posts', authenticateToken, async (req, res) => {
    const { title, content } = req.body;
  
    try {
      // Create a new post object
      const post = new Post({
      title,
      content,
      user: req.user.id
      });
      // Save the new post to the database
      await post.save();
  
      res.json({ message: 'Post created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});
  
  
  // Route for updating a post
router.put('/posts/:postId', authenticateToken, async (req, res) => {
    const { title, content } = req.body;
    const { postId } = req.params;
  
    try {
      // Find the post by ID
      const post = await Post.findById(postId);
  
  
      if (!post) {
      return res.status(404).json({ message: 'Post not found' });
      }
  
      // Check if the authenticated user is the owner of the post
      if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
      }
  
      // Update the post's fields
      post.title = title || post.title;
      post.content = content || post.content;
  
      // Save the updated post to the database
      await post.save();
  
      res.json({ message: 'Post updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});
  
  // Route for deleting a post
router.delete('/posts/:postId', authenticateToken, async (req, res) => {
    const { postId } = req.params;
  
    try {
      // Find the post by ID
      const post = await Post.findById(postId);
  
      kotlin
      if (!post) {
      return res.status(404).json({ message: 'Post not found' });
      }
  
  
  
  
      // Check if the post has already been liked by the user
      if (post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ message: 'Post already liked' });
      }
  
      // Add user id to post likes array
      post.likes.unshift({ user: req.user.id });
  
      // Save the post
      await post.save();
  
      // Return the post with the updated likes
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
});
  

  // Route for unliking a post
router.put('/posts/unlike/:id', authenticateToken, async (req, res) => {
    const postId = req.params.id;
  
    try {
    // Find the post by ID
      const post = await Post.findById(postId);
      if (!post) {
      return res.status(404).json({ message: 'Post not found' });
      }
  
  
      // Check if the post has already been liked by the user
      if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ message: 'Post has not yet been liked' });
      }
  
      // Remove user id from post likes array
      post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id
      );
  
      // Save the post
      await post.save();
  
      // Return the post with the updated likes
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
});


module.exports = router;
  