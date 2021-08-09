const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const auth = require('../middleware/auth');
const Team = require('../models/team');

// Router setup
const router = express.Router();

// Multer setup
const upload = multer({
  limits: {
    fileSize: 1000000, // 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(
        new Error(
          'Avatar must have one of those extensions: .jpg, .jpeg or .png'
        )
      );
    }

    cb(undefined, true);
  },
});

// Models
const User = require('../models/user');

// Route handlers
router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = user.generateAuthToken();

    res
      .cookie('access_token', token, {
        httpOnly: true,
        signed: true,
      })
      .send(user);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.post('/logout', auth, async (req, res) => {
  try {
    res.clearCookie('access_token').send();
  } catch (e) {
    res.status(400).send();
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    const teams = await Team.find({ owner: req.user._id });
    const user = req.user.toJSON();
    res.send({ ...user, teams });
  } catch (e) {
    res.status(500).send();
  }
});

router.post('', async (req, res) => {
  const newUser = new User(req.body);

  try {
    await newUser.save();
    const token = newUser.generateAuthToken();
    res
      .cookie('access_token', token, {
        httpOnly: true,
        signed: true,
      })
      .status(201)
      .send(newUser);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.patch('/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['email', 'password', 'name'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    throw new Error('Invalid updates');
  }

  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });

    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.delete('/me', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    user ? res.send(user) : res.status(404).send('User not found');
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/me/avatar', auth, async (req, res) => {
  try {
    if (!req.user.avatar) {
      throw new Error();
    }

    res.set('Content-Type', 'image/png');
    res.send(req.user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

router.post(
  '/me/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    req.user.avatar = buffer;
    req.user.hasAvatar = true;
    await req.user.save();
    res.status(201).send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete(
  '/me/avatar',
  auth,
  async (req, res) => {
    req.user.avatar = undefined;
    req.user.hasAvatar = false;
    await req.user.save();

    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;
