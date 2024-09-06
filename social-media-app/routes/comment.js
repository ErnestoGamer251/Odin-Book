// routes/comment.js
const express = require('express');
const router = express.Router();
const prisma = require('@prisma/client').PrismaClient();

// Crear un comentario en una publicación
router.post('/post/:postId/comment', async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send('Unauthorized');
  
  const postId = parseInt(req.params.postId);
  
  try {
    await prisma.comment.create({
      data: {
        content: req.body.content,
        author: {
          connect: { id: req.user.id }
        },
        post: {
          connect: { id: postId }
        }
      }
    });
    res.redirect(`/post/${postId}`);
  } catch (error) {
    res.status(500).send('Error al crear comentario');
  }
});

// Obtener comentarios de una publicación
router.get('/post/:postId/comments', async (req, res) => {
  const postId = parseInt(req.params.postId);

  try {
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: { author: true },
    });
    res.json(comments);
  } catch (error) {
    res.status(500).send('Error al obtener comentarios');
  }
});

module.exports = router;
