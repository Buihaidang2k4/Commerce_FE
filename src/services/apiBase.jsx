import axios from "axios";

const apiBase = axios.create({
    baseURL: "/api/v1",         
    withCredentials: true,    
    timeout: 15000
});

export default apiBase;
