/*
Name: Rachel White
Date: 3/2/2025
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
  const bookId = parseInt(id);
  return booksData.find(book.id === bookId);
};
const createError = require("http-errors");
const bcrypt = require("bcryptjs"); // Import bcryptjs
const users = require("../database/users");
const Ajv = require("ajv");
const ajv = new Ajv();

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

// Validation schema for security questions verification
const securityQuestionsVerifySchema = {
  type: "object",
  properties: {
    securityQuestions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          answer: { type: "string" },
        },
        required: ["answer"],
        additionalProperties: false,
      },
    },
  },
  required: ["securityQuestions"],
  additionalProperties: false,
};

// verify  user's security questions
app.post("/api/users/:email/verify-security-question", async (req, res, next) => {
  const { email } = req.params;
  const { securityQuestions } = req.body;

  console.log("Request Body:", req.body);

  // Validate  request body
  const validate = ajv.compile(securityQuestionsVerifySchema);
  const valid = validate(req.body);
  if (!valid) {
    console.error("Bad Request: Invalid request body", validate.errors);
    return next(createError(400, "Bad Request"));
  }

  try {
    // Fetch the user from the database
    const user = await users.findOne({ email: email });
    if (!user) {
      return next(createError(404, "User not found"));
    }

    console.log("User found:", user);

    if (
      securityQuestions[0].answer !== user.securityQuestions[0].answer ||
      securityQuestions[1].answer !== user.securityQuestions[1].answer ||
      securityQuestions[2].answer !== user.securityQuestions[2].answer
    ) {
      console.error("Unauthorized: Security questions do not match");
      return next(createError(401, "Unauthorized"));
    }



   res.status(200).send({ message: "Security questions successfully answered" });
  } catch (err) {
    console.error("Error: ", err.message);
    next(err);
  }
});

//Global error handler
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.message);
  const status = err.status || 500;
  res.status(status).json({
    status: status,
    message: err.message,
  });
});

module.exports = app;

