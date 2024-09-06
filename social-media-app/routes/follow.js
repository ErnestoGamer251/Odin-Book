// routes/follow.js
const express = require('express');
const router = express.Router();
const prisma = require('@prisma/client').PrismaClient();

// Seguir a un usuario
router.post('/follow/:id', async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send('Unauthorized');
  
  const userToFollowId = parseInt(req.params.id);

  try {
    await prisma.follow.create({
      data: {
        followerId: req.user.id,
        followingId: userToFollowId,
      }
    });
    res.redirect(`/profile/${userToFollowId}`);
  } catch (error) {
    res.status(500).send('Error al seguir al usuario');
  }
});

// Dejar de seguir a un usuario
router.post('/unfollow/:id', async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send('Unauthorized');

  const userToUnfollowId = parseInt(req.params.id);

  try {
    await prisma.follow.deleteMany({
      where: {
        followerId: req.user.id,
        followingId: userToUnfollowId,
      }
    });
    res.redirect(`/profile/${userToUnfollowId}`);
  } catch (error) {
    res.status(500).send('Error al dejar de seguir al usuario');
  }
});

// Obtener seguidores y seguidos de un usuario
router.get('/followers/:id', async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const followers = await prisma.follow.findMany({
      where: { followingId: userId },
      include: { follower: true },
    });
    res.json(followers);
  } catch (error) {
    res.status(500).send('Error al obtener seguidores');
  }
});

router.get('/following/:id', async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const following = await prisma.follow.findMany({
      where: { followerId: userId },
      include: { following: true },
    });
    res.json(following);
  } catch (error) {
    res.status(500).send('Error al obtener seguidos');
  }
});

module.exports = router;
