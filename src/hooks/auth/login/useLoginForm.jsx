import { useState } from "react";

export default function useLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return {
    email,
    password,
    setEmail,
    setPassword,
  };
}
