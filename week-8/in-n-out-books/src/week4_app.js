/*
 Name: Rachel White
 Date: 2/2/2025
 File Name: app.js
 Description: Application file for the In-N-Out-Books project.
*/

const express = require("express");
const app = express();
const port = 3000;
const books = require("../database/books");

// Middleware to parse JSON bodies
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send(`
        <html>
            <head>
                <title>In-N-Out-Books</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; color: #333; }
                    header { background: gray; color: #ffffff; padding: 20px 0; text-align: center; }
                    main { padding: 20px; }
                    div { margin: 20px 0; padding: 15px; background: #ffffff; border-radius: 5px; }
                    footer { text-align: center; padding: 10px 0; background: gray; color: black; }
                </style>
            </head>
            <body>
                <header><h1>Welcome to In-N-Out Books</h1></header>
                <main>
                    <div id="introduction">
                        <h2>About Us</h2>
                        <p>At In-N-Out Books, books and people are our passion...</p>
                    </div>
                    <footer><p>&copy; 2025 In-N-Out Books. All rights reserved.</p></footer>
                </main>
            </body>
        </html>
    `);
});

// API routes
app.get("/api/books", (req, res) => {
  res.json(books);
});

app.get("/api/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid book id" });
  }

  const book = books.find((b) => b.id === id);
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }
  res.json(book);
});

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).send("404: Page Not Found");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server, have some issues so updated
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Export the Express application
module.exports = app;
