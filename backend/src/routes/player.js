const express = require('express');

// Router setup
const router = express.Router();

// Models
const Player = require('../models/player');

// Route handlers
router.get('', async (req, res) => {
  try {
    const players = await Player.find({});
    res.send(players);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/:id', async (req, res) => {
  try {
    const player = await Player.find({ _id: req.params.id });
    if (!player) {
      return res.status(404).send({ error: 'Player not found' });
    }

    res.send(player);
  } catch (e) {
    res.status(500).send();
  }
});

router.post('', async (req, res) => {
  const newPlayer = new Player(req.body);

  try {
    await newPlayer.save();
    res.status(201).send(newPlayer);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['firstName', 'lastName', 'age'];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      throw new Error('Invalid updates!');
    }

    const player = await Player.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    player ? res.send(player) : res.status(404).send('Player not found');
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);

    player ? res.send(player) : res.status(404).send('Player not found');
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
