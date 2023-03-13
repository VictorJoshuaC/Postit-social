const express = require('express');
const router = express.Router();
const Comment = require('./models/commentModel');
const Reply = require('./models/replyModel');
const {authenticateToken} = require("../middlewares/auth");


// Route for deleting a comment reply
router.delete('/replies/:replyId', authenticateToken, async (req, res) => {
const { replyId } = req.params;

try {
    const reply = await Reply.findOne({
    _id: replyId,
    user: req.user.id,
    deletedAt: { $eq: null }
    });

    if (!reply) {
    return res.status(404).json({ message: 'Reply not found' });
    }

    // Soft delete the reply
    reply.deletedAt = new Date();
    await reply.save();

    // Remove reply from comment replies array
    const comment = await Comment.findById(reply.comment);
    comment.replies = comment.replies.filter(({ id }) => id !== replyId);

    // Save the comment
    await comment.save();

    // Return success response
    return res.status(200).json({ message: 'Reply deleted successfully' });
} catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
}
});

module.exports = router;