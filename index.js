require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyparser= require('body-parser');
const app = express();
const path = require('path');

mongoose.connect(process.env.DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.use(bodyparser.json());
app.use("/", require("./routes/emp"));
const cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, "/101291481_assignement2_frontend/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/101291481_assignement2_frontend/build', 'index.html'));
});

const port = process.env.PORT || 5555

app.listen(port, ()=>{
console.log(`server is up and listening on port ${port}`);
});