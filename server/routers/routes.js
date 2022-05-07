const express = require("express");
const auth = require("../services/middleWare");

const route = express.Router();

const userController = require("../controller/userController");
const bookController = require("../controller/bookController");
const bookCategoryController = require("../controller/bookCetogeryController");

// API User
route.post("/users", userController.create);

route.get("/users/", auth, userController.finduser);
route.get("/admins/", auth, userController.findadmin);

route.put("/users/:id", auth, userController.update);

route.put("/users/books/:id", userController.updatebook);

route.delete("/users/:id", auth, userController.delete);
route.post("/login", userController.login);

// API Books
route.post("/books", auth, bookController.create);
route.put("/books/:id", auth, bookController.update);
route.delete("/books/:id", auth, bookController.delete);
route.get("/books/", auth, bookController.find);

// Api Book category

route.post("/bookcategory", auth, bookCategoryController.create);
route.put("/bookcategory/:id", auth, bookCategoryController.update);
route.delete("/bookcategory/:id", auth, bookCategoryController.delete);
route.get("/bookcategory/", auth, bookCategoryController.find);

module.exports = route;
