const calculateInterest = (initalValue, monthlyInterest, monthlyPeriod) => {
  const newInstallments = [];

  let currentId = 1;
  let currentValue = initalValue;
  let percentage = 0;

  for (let i = 1; i <= monthlyPeriod; i++) {
    const percentValue = (currentValue * Math.abs(monthlyInterest)) / 100;

    currentValue =
      Math.abs(monthlyInterest) >= 0
        ? currentValue + percentValue
        : currentValue - percentValue;

    percentage = (currentValue / initalValue - 1) * 100;

    newInstallments.push({
      id: currentId++,
      value: currentValue,
      difference: currentValue - initalValue,
      percentage: isNaN(percentage) ? 0 : percentage,
      profit: monthlyInterest > 0,
    });
  }

  return newInstallments;
};

export { calculateInterest };
