const axios = require('axios');
const apiClient = axios.create({ baseURL: "http://localhost:8000/api/v1" });
console.log(apiClient.getUri({ url: '/products' }));
console.log(apiClient.getUri({ url: 'products' }));
