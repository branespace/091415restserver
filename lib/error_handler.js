module.exports = function (err, res) {
    console.log(err);
    res.status(500).send('500 Internal Server Error');
};
