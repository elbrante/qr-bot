import axios, * as others from 'axios';

axios.defaults.baseURL = 'https://thx-api-server.ru/qrbot'


export const getListAchive = () => {
    return axios.get('/getListAchive/')
}