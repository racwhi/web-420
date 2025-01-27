// 1. Comments at the top of the file
/*
  Name: Rachel White
  Date: 1/26/2025
  File Name: app.js
  Description: Application file for the In-N-Out-Books project.
*/

// 2. Require the Express module
const express = require("express");
const path = require("path");

// 3. Set up the Express application
const app = express();

// 4. Set the port for the application
const port = 3000;

// 5. Add a GET route for the root URL ("/")
app.get("/", (req, res) => {
  // Return an HTML response with a fully designed landing page
  const html = `
    <html>
      <head>
        <title>In-N-Out-Books</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <h1>Welcome to In-N-Out-Books</h1>
        <p>A platform for managing your book collections.</p>
      </body>
    </html>
  `;
  res.send(html);
});

// 6. Add middleware functions to handle 404 and 500 errors
// 404 error middleware
app.use((req, res, next) => {
  res.status(404).send("404: Page Not Found");
});

// 500 error middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (process.env.NODE_ENV === "development") {
    res.status(500).json({
      error: "Internal Server Error",
      stack: err.stack,
    });
  } else {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// 7. Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Export the Express application
module.exports = app;
