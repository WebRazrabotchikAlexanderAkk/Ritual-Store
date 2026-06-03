export function formatRuPhone(value) {
  const digits = value.replace(/\D/g, '').replace(/^8/, '7').replace(/^7?/, '7').slice(0, 11);
  const tail = digits.slice(1);
  const p1 = tail.slice(0, 3);
  const p2 = tail.slice(3, 6);
  const p3 = tail.slice(6, 8);
  const p4 = tail.slice(8, 10);

  let formatted = '+7';
  if (p1) formatted += ` (${p1}`;
  if (p1.length === 3) formatted += ')';
  if (p2) formatted += ` ${p2}`;
  if (p3) formatted += `-${p3}`;
  if (p4) formatted += `-${p4}`;

  return formatted;
}
