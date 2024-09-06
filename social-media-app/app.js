// app.js
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const flash = require('express-flash');
const initializePassport = require('./passport-config');
const PrismaClient = require('@prisma/client').PrismaClient;
const bcrypt = require('bcryptjs');
const postRouter = require('./routes/post');
app.use('/', postRouter);
const followRouter = require('./routes/follow');
app.use('/', followRouter);
const commentRouter = require('./routes/comment');
app.use('/', commentRouter);
const likeRouter = require('./routes/like');
app.use('/', likeRouter);
file://%20actualiza%20la%20ruta%20de%20obtener%20publicaciones%20para%20usar%20pugrouter.get('/posts',%20async%20(req,%20res)%20=%3E%20%7B%20%20const%20posts%20=%20await%20prisma.post.findMany(%7B%20%20%20%20include:%20%7B%20author:%20true,%20comments:%20%7B%20include:%20%7B%20author:%20true%20%7D%20%7D%20%7D%20%20%7D);%20%20res.render('posts',%20%7B%20posts%20%7D);%7D);





const prisma = new PrismaClient();
const app = express();

initializePassport(passport);

app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Registro de usuario
app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await prisma.user.create({
      data: {
        email: req.body.email,
        password: hashedPassword
      }
    });
    res.redirect('/login');
  } catch {
    res.redirect('/register');
  }
});

// Login de usuario
app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

app.listen(3000);

