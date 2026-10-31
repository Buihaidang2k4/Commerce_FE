export default function validatePassword(password) {
  if (typeof password !== 'string' || !password) return 'Vui lòng nhập mật khẩu.';
  if (password.length < 8 || password.length > 72) return 'Mật khẩu phải có từ 8 đến 72 ký tự.';
  if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(password)) {
    return 'Mật khẩu cần chữ hoa, chữ thường, số và ký tự đặc biệt @$!%*?&; không chứa khoảng trắng hoặc ký tự khác.';
  }
  return '';
}
