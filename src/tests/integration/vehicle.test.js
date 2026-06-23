const request = require("supertest");
const app = require("../../app");

describe("Vehicle API", () => {
  let token;
  let vehicleId;

  beforeAll(async () => {
    const uniqueEmail = `vehicle${Date.now()}@example.com`;

    // Register test user
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Vehicle Tester",
        email: uniqueEmail,
        password: "password123",
        role: "admin",
      });

    // Login and get token
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: uniqueEmail,
        password: "password123",
      });

    token = loginRes.body.token;

    expect(token).toBeDefined();
  });

  test("Create Vehicle", async () => {
    const res = await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send({
        vehicleNumber: `TEST${Date.now()}`,
        ownerName: "Integration Test",
        vehicleType: "car",
      });

    expect(res.statusCode).toBe(201);

    vehicleId = res.body.data.id;

    expect(vehicleId).toBeDefined();
  });

  test("Get All Vehicles", async () => {
    const res = await request(app)
      .get("/api/vehicles")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test("Get Vehicle By ID", async () => {
    const res = await request(app)
      .get(`/api/vehicles/${vehicleId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.id).toBe(vehicleId);
  });

  test("Update Vehicle", async () => {
    const res = await request(app)
      .put(`/api/vehicles/${vehicleId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        vehicleNumber: `TEST${Date.now()}`,
        ownerName: "Updated Owner",
        vehicleType: "car",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.ownerName).toBe("Updated Owner");
  });

  test("Delete Vehicle", async () => {
    const res = await request(app)
      .delete(`/api/vehicles/${vehicleId}`)
      .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);
  expect(res.body.status).toBe(true);
  });
});