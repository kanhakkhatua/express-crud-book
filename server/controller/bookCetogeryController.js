var BooksCategorydb = require("../model/bookCategoryModal");


exports.create = (req, res) => {

    if(!req.body) {
        res.status(400).send({message:"Content can not be empty"})
        return;
    }
    const book = new BooksCategorydb({
        
        bookCategory: req.body.bookCategory,
        books: req.body.books
       
    })

    book.save(book).then(data => {
      
        res.send(data)
        // res.redirect('/')
    })
    .catch(err => {
        res.status(500).send(
            {
                message: err.message || "error occured while creating a create user"

            }
        );
    });
}

exports.update = (req, res) => {

    if(!req.body){
        return res
        .status(400)
        .send({message: "Data to update can't be empty"})
    }

    const id = req.params.id;
    BooksCategorydb.findByIdAndUpdate(id, req.body, {useFindandModify: false})
    .then(data => {
        if(!data){
            res.status(400).send({message: `Cannot Find Book Category with ${id}, may be Book not found !`})

        }else{
            res.send(data)
        }
    })
    .catch(err => {
        res.status(500).send({message:"Error Book Category information"})
    })
}

exports.delete = (req, res) => {

    const id = req.params.id;

    BooksCategorydb.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(400).send({message: `Can not delete with id ${id}, may be id is wrong`})
        }else{
            res.send({
                message:"Category of the Book deleted Successfully !"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Could not delete category of this book with id=${id}`
        });
    });

}
