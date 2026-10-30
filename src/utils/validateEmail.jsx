function validateEmail(email) {
  if (!email || typeof email !== "string") {
    return "Email không được để trống";
  }

  const cleaned = email.trim();

  if (cleaned.length === 0) {
    return "Email không được để toàn khoảng trắng";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(cleaned)) {
    return "Email không đúng định dạng";
  }

  return ""; 
}


export default validateEmail;