const express = require('express');

// Router setup
const router = express.Router();

// Models
const Team = require('../models/team');
const Player = require('../models/player');

// Middleware
const auth = require('../middleware/auth');

// Route handlers
router.get('', async (req, res) => {
  try {
    const teams = await Team.find({});
    res.send(teams);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/:id', async (req, res) => {
  try {
    const team = await Team.find({ _id: req.params.id }).populate('owner');
    if (!team) {
      return res.status(404).send({ error: 'Team not found!' });
    }
    
    res.send(team);
  } catch (e) {
    res.status(500).send();
  }
});

router.post('', auth, async (req, res) => {
  const newTeam = new Team(req.body);

  try {
    newTeam.owner = req.user;
    await newTeam.save();
    res.status(201).send(newTeam);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.patch('/:id', auth, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).send({ error: 'Team not found!' });
    }

    if (req.user._id.toString() !== team.owner._id.toString()) {
      throw new Error('You do not own this team!');
    }

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name'];
    const isValidOperation = updates.every(update =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      throw new Error('Invalid updates!');
    }

    for (const update of updates) {
      team[update] = req.body[update];
    }
    await team.save();

    res.send(team);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return res.status(404).send({ error: 'Team not found!' });
    }

    if (req.user._id.toString() !== team.owner._id.toString()) {
      throw new Error('You do not own this team!');
    }

    res.send(team);
  } catch (e) {
    res.status(500).send();
  }
});

// players

router.post('/:id/players', auth, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).send( { error: 'Team not found!' });
    }

    if (req.user._id.toString() !== team.owner._id.toString()) {
      throw new Error('You do not own this team!');
    }

    const { playerId } = req.body;
    const player = await Player.findById(playerId);
    team.players.push(player);
    player.team = team;
    await team.save();
    await player.save();

    res.status(201).send(team);
  } catch (e) {
    res.status(400).send( { error: e.message });
  }
});

module.exports = router;