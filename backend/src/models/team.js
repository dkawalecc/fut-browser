const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Player = require('../models/player');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  avgStats: { type: Object },
  players: [{ type: Schema.Types.ObjectId, ref: 'Player' }]
});

teamSchema.methods.getAverageStat = async function(statName) {
  const team = this;
  const teamObject = team.toObject();

  const avg = { overall: 0 };

  for (const player of teamObject.players) {
    const playerWrapper = await Player.findById(player._id);
    for (const key of Object.keys(player[statName])) {
      if (!avg.hasOwnProperty(key))
        avg[key] = player[statName][key];
      else
        avg[key] += player[statName][key];
    }

    avg.overall += playerWrapper.getOverall()[statName];
  }

  if (teamObject.players.length > 0)
    Object.keys(avg).map((key) => avg[key] /= teamObject.players.length);

  return avg;
}

teamSchema.methods.getAverageStats = async function() {
  const team = this;
  const teamObject = team.toObject();

  const avgStats = {};
  const stats = ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'];
  for (const stat of stats) {
    avgStats[stat] = await team.getAverageStat(stat);
  }

  return avgStats;
}

teamSchema.pre('find', function() {
  this.populate('players');
})

teamSchema.post('find', async function(teams) {
  for (const team of teams) {
    team.avgStats = await team.getAverageStats();
  }
})

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;