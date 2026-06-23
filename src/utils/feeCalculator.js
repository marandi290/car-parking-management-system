const PARKING_RATES = {
  bike: 10,
  car: 20,
  truck: 40,
};

const calculateFee = (vehicleType, entryTime, exitTime) => {
  const hours = Math.ceil(
    (exitTime - entryTime) / (1000 * 60 * 60)
  );

  const ratePerHour = PARKING_RATES[vehicleType] || 20;

  return {
    hours,
    ratePerHour,
    totalFee: hours * ratePerHour,
  };
};

module.exports = calculateFee;