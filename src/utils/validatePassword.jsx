function validatePassword(password) {
  if (!password || typeof password !== "string") {
    return "Mật khẩu không được để trống";
  }

  const trimmed = password.trim();

  if (trimmed.length < 6) {
    return "Mật khẩu phải có ít nhất 6 ký tự";
  }

  if (!/[A-Z]/.test(trimmed)) {
    return "Mật khẩu phải có ít nhất một chữ in hoa";
  }

  if (!/[a-z]/.test(trimmed)) {
    return "Mật khẩu phải có ít nhất một chữ thường";
  }

  if (!/[0-9]/.test(trimmed)) {
    return "Mật khẩu phải có ít nhất một số";
  }

  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(trimmed)) {
    return "Mật khẩu phải có ít nhất một ký tự đặc biệt";
  }

  return ""; // hợp lệ
}

export default validatePassword;