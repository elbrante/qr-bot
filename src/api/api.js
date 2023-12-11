import axios, * as others from 'axios';


axios.defaults.baseURL = 'https://thx-api-server.ru/qrbot'
const urlAddressForGetImg = 'https://thx-api-server.ru/qrbot/getImage/'

export const getListAchive = () => {
    const tg = window.Telegram.WebApp;
    const user = tg.initDataUnsafe?.user;
    return axios.get(`/getListAchive/${user?.id}`)
}

export const getSrcImg = {
    unLock: (id) => urlAddressForGetImg + `unlock/${id}`,
    lock: (id) => urlAddressForGetImg + `lock/${id}`,
}
// https://thx-api-server.ru/qrbot/getImage/unlock/1

