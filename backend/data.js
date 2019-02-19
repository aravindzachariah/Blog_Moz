const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const DataSchema = new Schema(
  {
    id: Number,
    fname:String,
    lname:String,
    desig:String,
    email: String,
    password: String
  },
  { timestamps: true }
);


module.exports = mongoose.model("Data", DataSchema);
