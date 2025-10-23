export function formatCurrency(amount: number | string): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  // Format untuk Rupiah
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

export function formatCurrencySimple(amount: number | string): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  // Format sederhana: Rp 10.000
  return `Rp ${num.toLocaleString('id-ID')}`;
}