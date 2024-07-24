const express = require("express");
const app = express();
const dbConfig = require("./src/app/config/db.config");
const db = require("./models");
app.get("/", (req, res) => {
  res.send("running successfully1");
});

db.mongoose
  .connect(
    `mongodb+srv://noormohammedknr2:NXQTq5MKJUbQf7Po@taskmanager.0vw7cws.mongodb.net/`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

const port = process.env.PORT || 8080;

app.listen(port, (req, res) => {
  console.log(`listening on port o ${port}`);
});
