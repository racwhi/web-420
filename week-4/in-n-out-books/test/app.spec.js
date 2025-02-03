const request = require("supertest");
const app = require("../src/app");
const books = require("../database/books");

describe("Chapter 3: API Tests", () => {
  it("should return an array of books", async () => {
    const res = await request(app).get("/api/books");
    expect(res.status).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should return a single book", async () => {
    const res = await request(app).get("/api/books/1");
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("title", "The Fellowship of the Ring"); // check the book title
  });

  it("should return a 400 error if the id is not a number", async () => {
    const res = await request(app).get("/api/books/abc");
    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("error", "Invalid book id");
  });


});
