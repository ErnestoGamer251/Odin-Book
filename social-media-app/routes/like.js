// routes/like.js
const express = require('express');
const router = express.Router();
const prisma = require('@prisma/client').PrismaClient();

// Dar "me gusta" a una publicación
router.post('/post/:postId/like', async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send('Unauthorized');

  const postId = parseInt(req.params.postId);

  try {
    await prisma.post.update({
      where: { id: postId },
      data: {
        likes: { increment: 1 }
      }
    });
    res.redirect(`/post/${postId}`);
  } catch (error) {
    res.status(500).send('Error al dar "me gusta"');
  }
});

module.exports = router;
