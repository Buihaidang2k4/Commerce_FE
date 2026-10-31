import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function useLoginForm() {
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || '');
  const [password, setPassword] = useState('');
  return { email, password, setEmail, setPassword };
}
