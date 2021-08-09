const faker = require("faker");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const _ = require("lodash");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "fut-browser";

faker.seed(parseInt(process.argv[2]));


const positions = [
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
];

const workRates = ['low', 'medium', 'high'];

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);

  const db = client.db(dbName);

  // get access to the relevant collections
  const playersCollection = db.collection("players");
  const teamsCollection = db.collection("teams");
  const usersCollection = db.collection("users");

  // wipe all players first
  playersCollection.deleteMany({});

  // make a bunch of users
  let players = [];
  for (let i = 0; i < 200; i += 1) {
    let newPlayer = {
      firstName: faker.name.firstName("male"),
      lastName: faker.name.lastName(),
      age: faker.random.number({min: 18, max: 42}),
      nationality: faker.address.country(),
      league: faker.address.streetSuffix(),
      club: faker.address.city(3),
      position: [positions[faker.random.number(16)]],
      height: faker.random.number({min: 159, max: 206}),
      weight: faker.random.number({min: 50, max: 110}),
      addedOnDate: faker.date.recent(),
      attributes: {
        skillStars: faker.random.number(5),
        weakFoot: faker.random.number(5),
        workRate: {
          offensive: workRates[faker.random.number(2)],
          defensive: workRates[faker.random.number(2)],
        },
        playStyle: faker.lorem.words(),
      },
      pace: {
        acceleration: faker.random.number({min: 40, max: 99}),
        speed: faker.random.number({min: 40, max: 99}),
      },
      shooting: {
        finishing: faker.random.number({min: 40, max: 99}),
        power: faker.random.number({min: 40, max: 99}),
        freeKick: faker.random.number({min: 40, max: 99}),
        penalties: faker.random.number({min: 40, max: 99}),
        longShots: faker.random.number({min: 40, max: 99}),
        heading: faker.random.number({min: 40, max: 99}),
      },
      passing: {
        accuracy: faker.random.number({min: 40, max: 99}),
        shortPassing: faker.random.number({min: 40, max: 99}),
        longPassing: faker.random.number({min: 40, max: 99}),
        curl: faker.random.number({min: 40, max: 99}),
        crossing: faker.random.number({min: 40, max: 99}),
      },
      dribbling: {
        ballControl: faker.random.number({min: 40, max: 99}),
        composure: faker.random.number({min: 40, max: 99}),
        agility: faker.random.number({min: 40, max: 99}),
        balance: faker.random.number({min: 40, max: 99}),
      },
      defending: {
        interceptions: faker.random.number({min: 40, max: 99}),
        aggression: faker.random.number({min: 40, max: 99}),
        clearing: faker.random.number({min: 40, max: 99}),
        reaction: faker.random.number({min: 40, max: 99}),
        tackle: faker.random.number({min: 40, max: 99}),
      },
      physical: {
        jumping: faker.random.number({min: 40, max: 99}),
        stamina: faker.random.number({min: 40, max: 99}),
        strength: faker.random.number({min: 40, max: 99}),
      },
    };


    players.push(newPlayer);

    console.log(newPlayer.firstName);
  }
  playersCollection.insertMany(players);

  /*
  let users = [];
  for(let i = 0; i < 3; i++) {
    let newUser = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(10),
      hasAvatar: false,
      avatar: null,
    }

    users.push(newUser);
    console.log(newUser.password);
  };

  usersCollection.insertMany(users);

  let teams = [];
  for(let i = 0; i < 1; i++) {
    let playersForTeam = []
    for(let j = 0; j < 11; j++) {
      playersForTeam.push(_.sample(players));
    }
    
    let newTeam = {
      name: faker.company.companyName(0),
      owner: _.sample(users),
      avgStats: Object.create(null),
      players: playersForTeam,
    }

    teams.push(newTeam);
    console.log(newTeam.name);
  };

  teamsCollection.insertMany(teams);
  */
  console.log("Database seeded! :)");
  client.close();
});
