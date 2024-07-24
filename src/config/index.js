//white-listed url to avoid cors error
const whiteListedUrls = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
];

//methods allowed
const methodsAllowed = ["GET", "PUT", "POST", "DELETE", "OPTIONS", "PATCH"];


module.exports = {
    whiteListedUrls,
    methodsAllowed
}