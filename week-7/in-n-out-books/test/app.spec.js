//app.spec.js
const request = require("supertest");
const app = require("../src/app");
const books = require("../database/books");
const users = require("../database/users");
const bcrypt = require("bcryptjs"); // Import bcryptjs

describe("Chapter 6: API Tests", () => {
  it("should log a user in and return a 200-status with ‘Authentication successful’ message", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({ email: "harry@hogwarts.edu", password: "potter" });

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual("Authentication successful");
  });

  it("should return a 401-status code with ‘Unauthorized’ message when logging in with incorrect credentials", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({ email: "ray@hogwarts.edu", password: "potter" });

    expect(response.status).toEqual(401);
    expect(response.body.message).toEqual("Unauthorized");
  });

  it("should return a 400-status code with ‘Bad Request’ when missing email or password", async () => {
    const response1 = await request(app)
      .post("/api/login")
      .send({ email: "", password: "potter" });

    expect(response1.status).toEqual(400);
    expect(response1.body.message).toEqual("Bad Request");

    const response2 = await request(app)
      .post("/api/login")
      .send({ email: "harry@hogwarts.edu", password: "" });

    expect(response2.status).toEqual(400);
    expect(response2.body.message).toEqual("Bad Request");
  });
});
