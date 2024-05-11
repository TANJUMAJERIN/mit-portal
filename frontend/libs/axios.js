 import axios from 'axios'
 export default axios.create({
    baseURL: 'http://localhost:5000',
 })



// /*import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'http://localhost:3002', // Replace with your server's base URL
//   timeout: 5000, // Timeout for requests in milliseconds
// });

// export default instance;*/
