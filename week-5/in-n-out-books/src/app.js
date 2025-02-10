/*
 Name: Rachel White
 Date: 2/9/2025
 File Name: app.js
 Description: Application file for the In-N-Out-Books project.
*/

const express = require("express");
const app = express();
const port = 3000;
const books = require("../database/books");
const database = []; // Initialize an empty database array
const bodyParser = require("body-parser");

// Middleware to parse JSON bodies
app.use(express.json());

// GET route for the root URL ("/")
app.get("/", (req, res) => {
  // Return an HTML response with a fully designed landing page
  const html = `
   <html>
     <head>
       <title>In-N-Out-Books</title>
       <style>
        body {
   font-family: Arial, sans-serif;
   margin: 0;
   padding: 0;
   background-color: #f4f4f4;
   color: #333;
}


header {
   background: gray;
   color: #ffffff;
   padding: 20px 0;
   text-align: center;
}


main {
   padding: 20px;
}


div {
   margin: 20px 0;
   padding: 15px;
   background: #ffffff;
   border-radius: 5px;


}






footer {
   text-align: center;
   padding: 10px 0;
   background: gray;
   color: black;
   position: relative;
   bottom: 0;
   width: 100%;
}


       </style>
     </head>
     <body>


<header>
   <h1>Welcome to In-N-Out Books</h1>
</header>


<main>
   <div id="introduction">
       <h2>About Us</h2>
       <p>At In-N-Out Books, books and people are our passion. If you're looking, more than likely we have it and if we don't, we can get it. Everyone's welcome , from one book lover to another!</p>
   </div>


   <div id="top-selling-books">
       <h2>Top Selling Book(s)</h2>
       <ul>
           <li>The Bible</li>
       </ul>
   </div>


   <div id="hours-of-operation">
       <h2>Hours of Operation</h2>
       <p>Monday - Friday: 10 AM - 8PM CT</p>
       <p>Saturday: 10 AM - 6 PM CT</p>
       <p>Sunday: Closed</p>
   </div>


   <div id="contact-information">
       <h2>Contact Us</h2>
       <p>Email: contactus@innoutbooks.com</p>
       <p>Phone: (555) 555-1234</p>
       <p>Address: 5557 N Book St., Brooklyn, NY 12345</p>
   </div>
</main>


<footer>
   <p>&copy; 2025 In-N-Out Books. All rights reserved.</p>
</footer>


</body>
</html>
`;
  res.send(html);
});

// POST route to add a new book
app.post("/api/books", (req, res) => {
  const { title, author } = req.body;

  if (!title) {
    console.log("Error: Book title is required");
    return res.status(400).json({ message: "Book title is required." });
  }

  const newBook = {
    id: database.length + 1, //  generate an ID
    title,
    author,
  };

  console.log("New Book", newBook);
  database.push(newBook);
  res.status(201).json(newBook);
});

// DELETE route to delete a book
app.delete("/api/books/:id", (req, res) => {
  const { id } = req.params;
  const bookIndex = database.findIndex((book) => book.id === parseInt(id)); 

  if (bookIndex === -1) {
    console.log("Error: Book not found.");
    return res.status(404).json({ message: "Book not found." });
  }

  console.log("Deleted book:", database[bookIndex]);
  database.splice(bookIndex, 1);
  res.status(204).send();
});

module.exports = app;