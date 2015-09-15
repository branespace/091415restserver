exports.error500 = function(res, err){
  console.log(err);
  res.status(500).send('500 Internal Server Error');
};
