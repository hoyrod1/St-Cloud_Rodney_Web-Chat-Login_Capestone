// Require connection file to connect
const mongoose = require("./db-connect.js");
//==========================================================================================//
const Trainer = require("../model/Trainer.js");
const TrainingPackage = require("../model/TrainingPackage.js");
const Member = require("../model/Member.js");
//==========================================================================================//

const trainers = [
  {
    name: "Kaden",
    username: "BooBoo",
    email: "booboo@example.com",
  },
  {
    name: "Kamori",
    username: "KingKam",
    email: "king_kam@example.com",
  },
  {
    name: "Justin",
    username: "JustInTime",
    email: "justin@example.com",
  },
  {
    name: "Rodney",
    username: "Hot Rod",
    email: "hoyrod1@aol.com",
  },
  {
    name: "Lerah",
    username: "L_Boogie",
    email: "lerah@example.com",
  },
  {
    name: "Marvin",
    username: "Marv_T",
    email: "marvin@example.com",
  },
  {
    name: "Tango",
    username: "Time2Tango",
    email: "Time2Tango@example.com",
  },
  {
    name: "Cameo",
    username: "Cam_Ent",
    email: "cameo@aol.com",
  },
];

const trainingPackages = [
  {
    type: "resistance-training",
    pricePerHour: "$100",
    description:
      "The use of Free weights, resistance bands and the use of body wight",
  },
  {
    type: "cardio-training",
    pricePerHour: "$100",
    description:
      "The use of stationary machines, the use of out-door activity and swimming",
  },
  {
    type: "flexability-training",
    pricePerHour: "$100",
    description:
      "The use of static, dynamic stretching, ballistic stretching, active stretching, PNF stretching",
  },
  {
    type: "combination-training",
    pricePerHour: "$200",
    description:
      "This training regiment includes resistance training, cardio training and stretching",
  },
  {
    type: "Aqua Training",
    pricePerHour: "$150",
    description: "The use of water resistance",
  },
  {
    type: "Calestenics",
    pricePerHour: "$100",
    description: "The use of body weight resistance",
  },
  {
    type: "Yoga Training",
    pricePerHour: "$150",
    description: "The use of stretching and meditation",
  },
  {
    type: "Remote Combination-Training",
    pricePerHour: "$400",
    description:
      "This training regiment includes all the training systems remotely",
  },
];

const members = [
  {
    name: "Curtis Jackson",
    username: "BooBoo",
    email: "booboo@example.com",
  },
  {
    name: "Camron Dipset",
    username: "KingKam",
    email: "king_kam@example.com",
  },
  {
    name: "Carmelo Anthony",
    username: "JustInTime",
    email: "justin@example.com",
  },
  {
    name: "Ronnie Coleman",
    username: "Mr-Olympia",
    email: "MrOlympia@aol.com",
  },
  {
    name: "Patricia Beaubrun",
    username: "PattyCake",
    email: "patricia@example.com",
  },
  {
    name: "Sandra Thomas",
    username: "SandyT",
    email: "sandraT@example.com",
  },
  {
    name: "Lisa cloud",
    username: "LisaS",
    email: "lisaS@example.com",
  },
  {
    name: "Ivan Terry",
    username: "IVY_UPS",
    email: "ivanT@aol.com",
  },
];

async function seed() {
  try {
    await Trainer.deleteMany({});
    await TrainingPackage.deleteMany({});
    await Member.deleteMany({});
    //======================================================//
    const createdTrainers = await Trainer.create(trainers);
    console.log("Trainer: ", createdTrainers);
    //======================================================//
    //======================================================//
    const createdTrainingPackages = await TrainingPackage.create(
      trainingPackages
    );
    console.log("TrainingPackage: ", createdTrainingPackages);
    //======================================================//
    //======================================================//
    const createdMembers = await Member.create(members);
    console.log("Member: ", createdMembers);
    //======================================================//
    //======================================================//
    await mongoose.connection.close();
    //======================================================//
  } catch (err) {
    //======================================================//
    console.log(err);
    //======================================================//
  }
}

seed();
