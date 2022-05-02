const jwt = require("jsonwebtoken");

const authToken = async (req, res, next) => {
  let header = req.headers.authorization;
  //   console.log(header);
  const arr = header.split(" ");
  // console.log(arr);

  if (!req.headers) {
    res.status(500).send({ message: "Please Provide authorization" });
  } else if (arr[0] != "Bearer") {
    res.status(500).send({ message: "Please Provide data in Bearer format" });
  }

  var decoded = jwt.verify(arr[1], process.env.PRIVATEKEY);
  //   console.log(decoded)

  next();
};
module.exports = authToken;
