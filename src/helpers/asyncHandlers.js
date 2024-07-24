module.exports = function (execution) {
  return function (req, res, next) {
    execution(req, res, next).catch(next);
  };
};
