const calculateFee = require(
  "../../utils/feeCalculator"
);

describe("Fee Calculator", () => {
  test("Bike parking fee", () => {
    const entryTime = new Date(
      "2026-06-23T10:00:00"
    );

    const exitTime = new Date(
      "2026-06-23T13:00:00"
    );

    const fee = calculateFee(
      "bike",
      entryTime,
      exitTime
    );

    expect(fee.totalFee).toBe(30);
  });

  test("Car parking fee", () => {
    const entryTime = new Date(
      "2026-06-23T10:00:00"
    );

    const exitTime = new Date(
      "2026-06-23T13:00:00"
    );

    const fee = calculateFee(
      "car",
      entryTime,
      exitTime
    );

    expect(fee.totalFee).toBe(60);
  });

  test("Truck parking fee", () => {
    const entryTime = new Date(
      "2026-06-23T10:00:00"
    );

    const exitTime = new Date(
      "2026-06-23T13:00:00"
    );

    const fee = calculateFee(
      "truck",
      entryTime,
      exitTime
    );

    expect(fee.totalFee).toBe(120);
  });
});