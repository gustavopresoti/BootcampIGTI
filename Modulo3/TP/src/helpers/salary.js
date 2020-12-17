// Fonte: https://www.todacarreira.com/calculo-salario-liquido/

const INSS_TABLE = [
  {
    id: 1,
    minValue: 0,
    maxValue: 1045,
    difference: 1045 - 0,
    discountPercentage: 0.075,
    discountValue: -1,
  },
  {
    id: 2,
    minValue: 1045.01,
    maxValue: 2089.6,
    difference: 2089.6 - 1045,
    discountPercentage: 0.09,
  },
  {
    id: 3,
    minValue: 2089.61,
    maxValue: 3134.4,
    difference: 3134.4 - 2089.6,
    discountPercentage: 0.12,
  },
  {
    id: 4,
    minValue: 3134.41,
    maxValue: 6101.06,
    difference: 6101.06 - 3134.4,
    discountPercentage: 0.14,
  },
];

function round(value) {
  return +value.toFixed(2);
}

function calculateDiscountINSS(baseINSS) {
  let discountINSS = 0;

  if (baseINSS > 6101.07) {
    return 713.1;
  }

  for (var i = 0; i < INSS_TABLE.length; i++) {
    var currentItem = INSS_TABLE[i];
    let discountValue = 0;

    if (baseINSS > currentItem.maxValue) {
      // prettier-ignore
      discountValue = 
        round(currentItem.difference * currentItem.discountPercentage);

      discountINSS += discountValue;
    } else {
      // prettier-ignore
      discountValue = 
        round((baseINSS - currentItem.minValue) * currentItem.discountPercentage);

      discountINSS += discountValue;
      break;
    }
  }

  discountINSS = round(discountINSS);

  return discountINSS;
}

function calculateDiscountIRPF(baseIRPF) {
  let discountIRPF =
    baseIRPF < 1903.98
      ? 0
      : baseIRPF < 2826.65
      ? round(baseIRPF * 0.075) - 142.8
      : baseIRPF < 3751.05
      ? round(baseIRPF * 0.15) - 354.8
      : baseIRPF < 4664.68
      ? round(baseIRPF * 0.225) - 636.13
      : round(baseIRPF * 0.275) - 869.36;

  discountIRPF = round(discountIRPF);

  return discountIRPF;
}

function calculateSalaryFrom(fullSalary) {
  const baseINSS = isNaN(fullSalary) ? 0 : fullSalary;
  const discountINSS = calculateDiscountINSS(baseINSS);
  const percentINSS = round((discountINSS / fullSalary) * 100);
  const checkedPercentINSS = isNaN(percentINSS) ? 0 : percentINSS;

  const baseIRPF = baseINSS - discountINSS;
  const discountIRPF = calculateDiscountIRPF(baseIRPF);
  const percentIRPF = round((discountIRPF / fullSalary) * 100);
  const checkedPercentIRPF = isNaN(percentIRPF) ? 0 : percentIRPF;

  const netSalary = baseINSS - discountINSS - discountIRPF;
  const percentNetSalary = round((netSalary / fullSalary) * 100);
  // prettier-ignore
  const checkedPercentNetSalary = isNaN(percentNetSalary) ? 0 : percentNetSalary;

  return {
    baseINSS,
    discountINSS,
    checkedPercentINSS,
    baseIRPF,
    discountIRPF,
    checkedPercentIRPF,
    netSalary,
    checkedPercentNetSalary,
  };
}

export { calculateSalaryFrom };
