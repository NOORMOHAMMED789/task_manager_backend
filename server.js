const express = require("express");
const cors = require("cors");
const app = express();
const dbConfig = require("./db.config");
const taskRouter = require("./src/routes/tasks/index")
const bodyParser = require("body-parser");
const { whiteListedUrls, methodsAllowed } = require("./src/config");
const db = require("./src/models");

//Cors Options.
let corsOptions = {
  origin: whiteListedUrls,
  methods: methodsAllowed,
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

db.mongoose
  .connect(
    `mongodb+srv://noormohammedknr2:NXQTq5MKJUbQf7Po@taskmanager.0vw7cws.mongodb.net/`,
    {}
  )
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

const errorHandler = (error, request, response, next) => {
  console.log("*******ERRROR*******", error);
  const message = error.message || "Internal Server Error";
  const errorCode = error.errorCode || "unexpectedError";
  const status = error.status || 500;

  // Error handling middleware functionality
  console.log(`error ${error.message}`); // log the error
  response.status(status).send({
    message: message,
    code: errorCode,
  });
};
app.get("/", (req, res) => {
  res.json({ message: "Welcome to task manager vooshi backend" });
});

app.use('/tasks', taskRouter)
app.use(errorHandler)
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
