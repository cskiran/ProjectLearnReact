import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://reactburger-63977.firebaseio.com/'
});

export default instance;