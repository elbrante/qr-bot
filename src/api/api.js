import axios, * as others from 'axios';
import {user_id} from "./dataUser";

axios.defaults.baseURL = 'https://thx-api-server.ru/qrbot'
const urlAddressForGetImg = 'https://thx-api-server.ru/qrbot/getImage/'

export const getListAchive = () => {
    return axios.get(`/getListAchive/${user_id}`)

}

export const getSrcImg = {
    unLock: (id) => urlAddressForGetImg + `unlock/${id}`,
    lock: (id) => urlAddressForGetImg + `lock/${id}`,
}
// https://thx-api-server.ru/qrbot/getImage/unlock/1

