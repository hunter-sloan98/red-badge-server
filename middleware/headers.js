module.exports = (req, res, next) => {
  res.header('Access-Contol-Allow-Origin', '*');
  res.header('Access-Contol-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS');
  res.header('Access-Contol-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization');
  
  next();

};