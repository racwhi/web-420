//app.spec.js
const request = require("supertest");
const app = require("../src/app");
const books = require("../database/books");
//const { getAllBooks, updateBook } = require("../database/collection"); // Import getAllBooks and updateBook

describe("Chapter 5: API Tests", () => {
  // Test Case 1: Update a book and return 204
  it("should update a book and return a 204-status code", async () => {
    const response = await request(app)
      .put("/api/books/1")
      .send({ title: "Updated Title" })
      .expect(204);
  });

  // Test Case 2: Non-numeric ID (400 Bad Request)
  it("should return a 400-status code when using a non-numeric id", async () => {
    const response = await request(app)
      .put("/api/books/abc")
      .send({ title: "Some Title" })
      .expect(400);

    expect(response.body.error).toContain("Invalid book ID"); // Access error from the response body
  });

  // Test Case 3: Missing Title (400 Bad Request)
  it("should return a 400-status code when updating a book with a missing title", async () => {
    const bookIdToUpdate = 1;

    const response = await request(app)
      .put(`/api/books/${bookIdToUpdate}`)
      .send({}) // Empty body (missing title)
      .expect(400);

    expect(response.body.error).toContain("Title is required"); // Access error from the response body
  });
});
