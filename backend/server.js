const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");
const API_PORT = 3001;
const app = express();
const router = express.Router();
const cors=require("cors");

const dbRoute = 'mongodb://localhost:27017/myapp'; 

app.use(
  cors(
    {origin:"http://localhost:3000",credentials:true,
  }
  ),
)

mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));


db.on("error", console.error.bind(console, "MongoDB connection error:"));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cors());

router.get("/getData", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    console.log(data);
    return res.json({ success: true, data: data });
  });
});


router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  Data.findOneAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Data.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});


router.post("/putData", (req, res) => {
  let data = new Data();

  const { id, email ,password,lname,fname,desig} = req.body;

  if ((!id && id !== 0) || !email || !password || !lname || !fname || !desig) 
  {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.email = email;
  data.id = id;
  data.password=password;
  data.lname=lname;
  data.fname=fname;
  data.desig=desig;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

app.use("/api", router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
