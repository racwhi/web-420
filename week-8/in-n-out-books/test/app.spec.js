//app.spec.js
const request = require("supertest");
const app = require("../src/app");
const books = require("../database/books");
const users = require("../database/users");
const bcrypt = require("bcryptjs"); // Import bcryptjs

describe("Chapter 7: API Tests", () => {
  it("should return a 200 status with 'Security questions successfully answered' message", async () => {
    const res = await request(app)
      .post("/api/users/harry@hogwarts.edu/verify-security-question")
      .send({
        securityQuestions: [
          { answer: "Hedwig" },
          { answer: "Quidditch Through the Ages" },
          { answer: "Evans" },
        ],
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual(
      "Security questions successfully answered"
    );
  });

  it("should return a 400 status code with 'Bad Request' when request body fails ajv validation", async () => {
    const res = await request(app)
      .post("/api/users/harry@hogwarts.edu/verify-security-question")
      .send({
        securityQuestions: [
          { answer: "Hedwig", question: "What is your pet's name?" },
        ],
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Bad Request");
  });

  it("should return a 401 status code with 'Unauthorized' message when the security questions are incorrect", async () => {
    const res = await request(app)
      .post("/api/users/harry@hogwarts.edu/verify-security-question")
      .send({
        securityQuestions: [
          { answer: "Hedwig" },
          { answer: "Quidditch Through the Ages" },
          { answer: "Wrong" },
        ],
      });

    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("Unauthorized");
  });
});
