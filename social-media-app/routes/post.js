// routes/post.js
const express = require('express');
const router = express.Router();
const prisma = require('@prisma/client').PrismaClient();

// Crear una publicación
router.post('/post', async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send('Unauthorized');
  
  await prisma.post.create({
    data: {
      content: req.body.content,
      author: {
        connect: { id: req.user.id }
      }
    }
  });
  res.redirect('/');
});

// Mostrar todas las publicaciones
router.get('/posts', async (req, res) => {
  const posts = await prisma.post.findMany({
    include: { author: true, comments: true }
  });
  res.json(posts);
});

module.exports = router;
