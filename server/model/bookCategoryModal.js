const mongoose = require("mongoose");


var schema = new mongoose.Schema({
    
    bookCategory: {
        type: String,
        unique: true,
        required: [true, 'Book Category Required'],
    },
    books:[
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "books"
            }
    ]
    

})

const BookCategoryDB = mongoose.model('bookcategory', schema);

module.exports = BookCategoryDB