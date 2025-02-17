/*
 Name: Rachel White
 Date: 2/16/2025
 File Name: app.js
 Description: Application file for the In-N-Out-Books project.
*/

const express = require("express");
const app = express();
const port = 3000;
const books = require("../database/books");
const database = []; // Initialize an empty database array
const bodyParser = require("body-parser");
const getBookById = (id) => {
  const bookId = parseInt(id)
  return booksData.find(book.id === bookId);
}

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


// PUT route to update a book
app.put("/api/books/:id", (req, res) => {
  const bookId = req.params.id;
  const updatedBookData = req.body;

  // Input validation
  if (!/^\d+$/.test(bookId)) {
    return res
      .status(400)
      .send({ error: "Invalid book ID.  Must be a number." });
  }


  const parsedId = parseInt(bookId);

  if (!updatedBookData.title) {
    return res.status(400).send({ error: "Title is required" });
  }

  try {
    const existingBook = getBookById(parsedId);
    if (!existingBook) {
      return res.status(404).send({ error: "Book not found" });
    }

    const updatedBook = updateBook(parsedId, updatedBookData);

    if (updatedBook) {
      res.status(204).send(); // Successfully updated, no content to return
    } else {
      res.status(500).send({ error: "Failed to update the book" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});


app.get("/", (req, res) => {
  res.send("In-N-Out-Books API");
});

// Start the server (for testing and running)
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

module.exports = app; // Export for testing
