var Booksdb = require("../model/bookModel");
var BooksCategorydb = require("../model/bookCategoryModal");

exports.create = (req, res) => {
  // console.log(req)

  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }
  const book = new Booksdb({
    name: req.body.name,
    authorName: req.body.authorName,
    publisher: req.body.publisher,
    publishYear: req.body.publishYear,
    price: req.body.price,
    pages: req.body.pages,
    category: req.body.category,
  });

  book
    .save(book)
    .then((data) => {
      // console.log(data._id);
      category_id = req.body.category;
      // user_id = req.body.user
      res.send(data);
      return BooksCategorydb.findByIdAndUpdate(
        category_id,
        {
          $push: {
            books: data._id,
          },
        },
        { new: true, useFindAndModify: false }
      );
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error occured while creating a create user",
      });
    });
};

exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    Booksdb.findById(id)
      .populate("category")
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: `Not found book with id${id}` });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "erroe retrieving book with id " + id });
      });
  } else {
    Booksdb.find()
      .populate("category")
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res
          .status(500)
          .send({
            message:
              err.message || "Error Occurred while retriving book information",
          });
      });
  }
};

exports.update = (req, res) => {
  if (!req.body) {
    // console.log("data can not empty")
    return res.status(400).send({ message: "Data to update can't be empty" });
  }

  const id = req.params.id;
  Booksdb.findByIdAndUpdate(id, req.body, { useFindandModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(400)
          .send({
            message: `Cannot Update Book with ${id}, may be Book not found !`,
          });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update Book information" });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Booksdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(400)
          .send({
            message: `Can not delete with id ${id}, may be id is wrong`,
          });
      } else {
        res.send({
          message: "Books deleted Successfully !",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete book with id=${id}`,
      });
    });
};
