const mongoose = require("mongoose");
const validator = require("validator");

const photizoSchema = new mongoose.Schema({
  surname: {
    type: String,
    required: [true, "Please enter your surname name."],
    maxLength: 30,
    minLength: 5,
  },
    lastName: {
    type: String,
    required: [true, "Please enter your last name."],
    maxLength: 30,
    minLength: 5,
  },
  firstName: {
    type: String,
    required: [true, "Please enter your first name."],
    maxLength: 30,
    minLength: 5,
  },
  gender:{
    type: String,
    required: [true, "Please select a gender in the option."]
  },
  age:{
    type: String,
    required: [true, "Please select your age range."]
  },
  mobileNumber: {
    type: Number,
    maxLength: 15,
    minLength: 11
  },
  city: {
    type: String,
    required: [true, "Please enter your city name."]
  },
  state:{
    type: String,
    required: [true, "Please enter your state name."]
  },
  occupation:{
    type: String,
    required: [true, "Please enter your occupation."]
  },
  attendance:{
    type: String,
    required: [true, "Please enter where you are joining us from."]
  },
  learnings:{
    type: String,
    required: [true, "Please enter How you learnt about the program."]
  },
  otherLearnings:{
    type: String
  },
  expectations:{
    type: String,
    required: [true, "Please let us know what your expectations are from Photizo this year."]
  },
  questions:{
    type: String,
    required: [true, "Please let us know your questions."]
  },
  photo: {
    type: String,
    required: [true, "Please upload your payment receipt."]
  },
  comments:{
    type: String
  },
  email: {
    type: String,
    required: [true, "Please enter your email address."],
    unique: [true, "A user with this email exists."],
    validate: [validator.isEmail, "Invalid email address."]
  },
  serialNo:{
   type: Number,
   unique: true
  },
  isActive: {
    type: Boolean,
    default: true,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isPasswordChangedAt: Date,
  passwordResetToken: String,
  passwordResetTokenExpiresIn: Date
});

photizoSchema.pre("save",async function(next){
  const count = await Photizo.countDocuments({}); // Empty query to count all documents
  this.serialNo=(count + 1);
  next();
})

photizoSchema.pre(/^find/, function(next) {
  this.find({ isActive: { $ne: false } });
  next();
});


const Photizo = mongoose.model('Photizo', photizoSchema);

module.exports = Photizo;
