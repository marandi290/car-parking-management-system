const request = require("supertest");
const app = require("../../app");

describe("Auth API", () => {
  const testUser = {
    name: "Test User",
    email: `test${Date.now()}@example.com`,
    password: "password123",
    role: "operator",
  };

  test("Should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(testUser);

    console.log(res.body);

    expect(res.statusCode).toBe(201);

    expect(res.body.success).toBe(true);

    expect(res.body.user).toHaveProperty("id");

    expect(res.body.user).toHaveProperty("id");
    expect(res.body.user.email).toBe(
    testUser.email
    );
  });

  test("Should login successfully", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(res.statusCode).toBe(200);

    expect(res.body.success).toBe(true);

    expect(res.body).toHaveProperty("token");
  });
});