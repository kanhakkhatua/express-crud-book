var Userdb = require("../model/userModel");
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.create = (req, res) => {
    // console.log(req.body)

    if(!req.body) {
        res.status(400).send({message:"Content can not be empty"})
        return;
    }

    var regPassword = req.body.password
    // console.log(regPassword)

    var hash = bcrypt.hashSync(regPassword, 12);
    // console.log(hash)


    const user = new Userdb({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        age: req.body.age,
        phone: req.body.phone,
        adhaar: req.body.adhaar,
        gender: req.body.gender,
        maritialStatus: req.body.maritialStatus,
        userType: req.body.userType,
        books: req.body.books
    })

    user.save(user).then(data => {
        book = req.body.book
        
        res.send(data)

        if(book){
            return Userdb.findByIdAndUpdate(data._id, {
                    $push: {
                        books: book
                    }
            }, { new: true, useFindAndModify: false })
        }
 
    })
    .catch(err => {
        res.status(500).send(
            {
                message: err.message || "error occured while creating a create user"

            }
        );
    });

}




exports.find = (req, res) => {

    if(req.query.id){

        const id = req.query.id;
        Userdb.findById(id)
        .populate("books")
        .then(data => {
            if(!data){
                res.status(404).send({message: `Not found user with id${id}`})

            }else{
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({message:"erroe retrieving user with id " + id})
        })

    }else{
       
        Userdb.find()
        .populate("books")
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Error Occurred while retriving user information"})
        })
    }
}

exports.update = (req, res) => {

    if(!req.body){
        return res
        .status(400)
        .send({message: "Data to update can't be empty"})
    }
    const id = req.params.id;

    

    
    Userdb.findByIdAndUpdate(id, req.body, {useFindandModify: false})
    .then(data => {
        // console.log(data)
        if(!data){
            res.status(400).send({message: `Cannot Update user with ${id}, may be user not found !`})

        }else{
            res.send(data)
            book = req.body.book
            if(book){
                return Userdb.findByIdAndUpdate(data._id, {
                    $push: {
                        books: book
                    }
                }, { new: true, useFindAndModify: false })
            }
        }
    })
    .catch(err => {
        res.status(500).send({message:"Error Update user information"})
    })
}

exports.delete = (req, res) => {

    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(400).send({message: `Can not delete with id ${id}, may be id is wrong`})
        }else{
            res.send({
                message:"User was deleted Successfully !"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Could not delete user with id=${id}`
        });
    });

}

exports.login = async(req, res) => {
   try{
    const email = req.body.email
    const password = req.body.password

    const userData = await Userdb.findOne({email: email})
    // console.log(userData)

    if(!userData){
        res.status(200).send("Please enter valide email or Register Now")
    }

    const isMatch = await bcrypt.compare(password, userData.password)

    if(isMatch){
        // console.log(userData._id);

        var authToken = jwt.sign({ id: userData._id }, process.env.PRIVATEKEY);

        res.status(200).json({success: true,
        token: authToken,
        data: userData});

    }else{
        res.status(200).send("Invalide Password Details !")
    }

   }catch(err){
       res.status(400).send("Please Register First!")
   }

}

