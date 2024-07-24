module.exports = {
  HOST:process.env.DBHost + process.env.DBName + "?retryWrites=true&w=majority",
  PORT: process.env.DBPort,
  DB: process.env.DBName,
  userName: process.env.DBUserName,
  userPassword: process.env.DBPassword,
};
