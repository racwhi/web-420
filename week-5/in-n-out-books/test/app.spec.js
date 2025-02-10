//app.spec.js
const request = require("supertest");
const app = require("../src/app");
const books = require("../database/books");

describe("Chapter [Number]: API Tests", () => {
  // This will hold an in-memory database for tests
  let database = [];

  // reset  database before each test
  beforeEach(() => {
    database = []; // Resetting  database
    // Assign the database to global for access in app.js
    global.database = database;
  });

  it("should return a 201-status code when adding a new book", async () => {
    const book = { title: "New Book", author: "Author Name" };

    const response = await request(app).post("/api/books").send(book);
    expect(response.status).toBe(201); // Expecting status 201
    expect(response.body).toHaveProperty("id"); // Expecting response to have an id
    expect(response.body.title).toBe(book.title); // Expecting the title to match
    expect(response.body.author).toBe(book.author); // Expecting the author to match
  });

  it("should return a 400-status code when adding a new book with missing title", async () => {
    const book = { author: "Author Name" }; // Missing title

    const response = await request(app).post("/api/books").send(book);
    expect(response.status).toBe(400); // Expecting status 400
    expect(response.body.message).toBe("Book title is required."); // Expecting specific error message
  });

  it("should return a 204-status code when deleting a book", async () => {
    const book = { title: "Book to Delete", author: "Author Name" };
    const bookResponse = await request(app).post("/api/books").send(book);
    const bookId = bookResponse.body.id; // Get the ID of the newly created book

    const deleteResponse = await request(app).delete(`/api/books/${bookId}`);
    expect(deleteResponse.status).toBe(204); // Expecting status 204 (No Content)
  });
});
