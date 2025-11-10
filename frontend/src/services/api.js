
import axios from 'axios';


const token = localStorage.getItem('user-token');

const api = axios.create({

    baseURL: 'http://localhost:5000' 
});


if (token) {
    api.defaults.headers.common['x-access-token'] = token;
}

export default api;