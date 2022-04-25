const jwt = require("jsonwebtoken");

const authToken = async(req, res, next) => {
    try {

        let header = req.headers.authorization;
        const arr = header.split(" ")

        if(!req.headers){
            res.status(500).send({message: "Please Provide authorization"})
        }
        else if(arr[0] != 'Bearer'){
            res.status(500).send({message: "Please Provide data in Bearer format"})
        }

        var decoded = jwt.verify(arr[1], process.env.PRIVATEKEY);
        // console.log(decoded) 
        
       next(); 
    } catch (error) {
        res.status(401).send(error)
    }
}
module.exports = authToken