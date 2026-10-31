export const normalizeEmail = (email) => typeof email === 'string' ? email.trim().toLowerCase() : '';

export default function validateEmail(email) {
  const value = normalizeEmail(email);
  if (!value) return 'Vui lòng nhập email.';
  if (value.length > 254 || !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
    return 'Email không đúng định dạng.';
  }
  return '';
}
