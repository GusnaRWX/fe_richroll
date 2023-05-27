const numberFormat = (value = 0) => {
  if (!Number(value)) return 0;
  return new Intl.NumberFormat('id-ID', {
    currency: 'IDR',
  }).format(Number(value));
};

export { numberFormat };
