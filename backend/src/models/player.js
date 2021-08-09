const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Player's age must be a positive number");
      }
    },
  },
  nationality: {
    type: String,
    required: true,
    trim: true,
  },
  league: {
    type: String,
    required: function () {
      return this.club.toLowerCase() !== 'free agent';
    },
    trim: true,
  },
  club: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: [
      {
        //table, max2
        type: String,
        uppercase: true,
        required: 'Specify at least one factor',
        enum: [
          'GK',
          'CB',
          'LB',
          'RB',
          'LWB',
          'RWB',
          'CMD',
          'CM',
          'CAM',
          'RM',
          'LM',
          'LW',
          'RW',
          'CF',
          'ST',
          'LF',
          'RF',
        ],
      },
    ],
    validate: [
      arrayLimit,
      '{PATH} exceeds the limit of 2 positions per player',
    ],
  },
  height: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) {
        throw new Error("Player's height must be a positive number");
      }
    },
  },
  weight: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) {
        throw new Error("Player's weight must be a positive number");
      }
    },
  },
  addedOnDate: {
    type: Date,
    default: Date.now,
  },
  attributes: {
    skillStars: {
      type: Number,
      min: 0,
      max: [5, 'Maximum 5 stars rating'],
      default: 0,
    },
    weakFoot: {
      type: Number,
      min: 0,
      max: [5, 'Maximum 5 stars rating'],
      default: 0,
    },
    workRate: {
      offensive: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
      },
      defensive: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
      },
    },
    playStyle: {
      type: String,
      default: ' ',
      lowercase: true,
    },
  },
  //attributes used for main stats calculation
  // #1
  pace: {
    acceleration: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    speed: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  },
  // #2
  shooting: {
    finishing: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    power: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    freeKick: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    penalties: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    longShots: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    heading: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  },
  // #3
  passing: {
    accuracy: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    shortPassing: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    longPassing: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    curl: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    crossing: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  },
  // #4
  dribbling: {
    ballControl: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    composure: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    agility: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    balance: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  },
  // #5
  defending: {
    interceptions: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    aggression: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    clearing: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    reaction: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    tackle: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  },
  // #6
  physical: {
    jumping: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    stamina: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    strength: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  },
  avgStats: { type: Object }
});

function arrayLimit(val) {
  return val.length <= 2;
}

playerSchema.methods.getOverall = function () {
  const player = this;
  const playerObject = player.toObject();

  const avg = {};
  const stats = ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'];
  stats.forEach(stat => {
    const statPropertiesLength = Object.keys(playerObject[stat]).length;
    avg[stat] = Object.values(playerObject[stat]).reduce((prev, cur) => prev + cur) / statPropertiesLength;
  })

  return avg;
}

playerSchema.methods.toJSON = function () {
  const player = this;
  const playerObject = player.toObject();

  delete playerObject.__v;

  return playerObject;
};

playerSchema.post('find', function(players) {
  for (const player of players) {
    player.avgStats = player.getOverall();
  }
})

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
