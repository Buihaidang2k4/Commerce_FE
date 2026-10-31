import { API_PREFIX } from '../constants/apiPathConstants';
import axios from "axios";

const apiBase = axios.create({
    baseURL: API_PREFIX,
    withCredentials: true,
    timeout: 15000
});

export default apiBase;
