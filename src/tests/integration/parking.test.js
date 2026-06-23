const request = require("supertest");
const app = require("../../app");

describe("Parking Workflow API", () => {
  let token;
  let vehicleId;
  let slotId;

  beforeAll(async () => {
    const uniqueEmail =
      `parking${Date.now()}@example.com`;

    // Register Admin
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Parking Admin",
        email: uniqueEmail,
        password: "password123",
        role: "admin",
      });

    // Login
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: uniqueEmail,
        password: "password123",
      });

    token = loginRes.body.token;

    expect(token).toBeDefined();

    // Create Slot
    const slotRes = await request(app)
    .post("/api/slots")
    .set(
        "Authorization",
        `Bearer ${token}`
    )
    .send({
        slotNumber: `A${Date.now()}`,
        slotType: "car",
        status: "available",
    });

    slotId = slotRes.body.id;

    // Create Vehicle
    const vehicleRes = await request(app)
      .post("/api/vehicles")
      .set(
        "Authorization",
        `Bearer ${token}`
      )
      .send({
        vehicleNumber: `TEST${Date.now()}`,
        ownerName: "Parking Test",
        vehicleType: "car",
      });

    vehicleId = vehicleRes.body.data.id;
  });

    test("Vehicle Entry", async () => {
    const res = await request(app)
        .post("/api/parking/entry")
        .set("Authorization", `Bearer ${token}`)
        .send({
        vehicleId,
        });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);

    slotId = res.body.data.slotId;
    });

    test("Slot becomes occupied", async () => {
    const res = await request(app)
        .get(`/api/slots/${slotId}`)
        .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("occupied");
    });

  test("Vehicle Exit", async () => {
    const res = await request(app)
      .post("/api/parking/exit")
      .set(
        "Authorization",
        `Bearer ${token}`
      )
      .send({
        vehicleId,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(
      Number(res.body.data.fee)
    ).toBeGreaterThan(0);
  });

  test("Slot becomes available again", async () => {
    const res = await request(app)
      .get(`/api/slots/${slotId}`)
      .set(
        "Authorization",
        `Bearer ${token}`
      );

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe(
      "available"
    );
  });
});