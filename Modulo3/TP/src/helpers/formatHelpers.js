function formatNumber(value) {
  return `R$ ${value.toLocaleString('pt-br', { minimumFractionDigits: 2 })}`;
}

export { formatNumber };
