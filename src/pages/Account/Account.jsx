import React, {useRef} from 'react';
import cl from './Account.module.css'
import {useTelegram} from '../../hooks/useTelegram';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {GrayBonuses, GrayLoyalLevel, GrayOrders, GrayPhone} from "../../assets/icons";
import {ButtonShowQR} from "../../components/buttonShowQR";
import QRCode from "qrcode";
import classNames from "classnames";

export const Account = () => {

    const {user, onClose} = useTelegram();
    const [phoneNum, setPhoneNum] = useState('');
    const [bonuses, setBonuses] = useState(500);

    const backend_url = "https://thx-api-server.ru/bazzar"

    useEffect(() => {

        const userid = user?.id;

        const userId = {
            tg_id: userid?.toString()
        };

        axios.post(`${backend_url}/phone_number`, userId)
            .then(response => {
                console.log(response.data);

                setPhoneNum(
                    response.data['phone_number']
                )

            })
            .catch(error => {
                console.error(error);
            });

    }, [])


    useEffect(() => {

        const userid = user?.id;

        const userId = {
            tg_id: userid?.toString()
        };

        axios.post(`${backend_url}/bonuses`, userId)
            .then(response => {
                console.log(response.data);

                setBonuses(
                    response.data['bonuses']
                )

            })
            .catch(error => {
                console.error(error);
            });

    }, [])


    const BOT_TOKEN = '6285433302:AAHf3eK1mGHql7quzdrJhP9GtEQzyU6Ug7g';

    function UserProfilePhoto(userId) {
        const [photoUrl, setPhotoUrl] = useState('');

        useEffect(() => {
            async function fetchUserProfilePhoto() {
                const apiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/getUserProfilePhotos?user_id=${userId}`;
                const response = await fetch(apiUrl);
                const data = await response.json();
                if (data.result && data.result.photos.length > 0) {
                    const fileId = data.result.photos[0][0].file_id;
                    const photoApiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileId}`;
                    const photoResponse = await fetch(photoApiUrl);
                    const photoData = await photoResponse.json();
                    if (photoData.result) {
                        const photoPath = photoData.result.file_path;
                        const photoUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${photoPath}`;
                        setPhotoUrl(photoUrl);
                    }
                }
            }

            fetchUserProfilePhoto();
        }, [userId]);

        return (
            <img src={photoUrl} alt="User Profile" className={cl.profilePicture}/>
        );
    }

    const profPic = UserProfilePhoto(user?.id);

    ////////////
    //Тут код, который связан с QR-кодом
    const [idUser, setIdUser] = useState(user?.id);
    const [visibleQR, setVisibleQR] = useState(false)
    const switchVisible = () => {setVisibleQR(!visibleQR)}
    const canvasRef = useRef();
    useEffect(() => {

        QRCode.toCanvas(
            canvasRef.current,
            idUser,
            (error) => error && console.error(error)
        );
    }, [idUser]);
    ///////////

    return (
        <div className={cl.wrapperAccount}>
            <div className={cl.firstBlock}>
                {profPic}
                <div className={cl.nameInfo}>
                    <span className={cl.nameUser}>{user?.first_name}</span>
                    <div className={cl.phoneId}>
                        <span>ID: {user?.id}</span>
                    </div>
                </div>
            </div>

            {/*Тут код, который связан с QR-кодом*/}

            <ButtonShowQR onClick={switchVisible}>
                Показать QR-код
            </ButtonShowQR>
            <canvas ref={canvasRef} className={classNames({
                [cl.visibleQrOn]: visibleQR,
                [cl.visibleQrOff]: !visibleQR,
            })}/>

            {/*Тут код, который связан с QR-кодом*/}

            <div className={cl.detailInfo}>
                <div className={cl.infoBlock}>
                    <GrayPhone/>
                    <div className={cl.infoRow}>
                        <span className={cl.nameInfoRow}>Номер телефона</span>
                        <span className={cl.detailInfoRow}>{phoneNum}</span>
                    </div>
                </div>

                <div className={cl.infoBlock}>
                    <GrayBonuses/>
                    <div className={cl.infoRow}>
                        <span className={cl.nameInfoRow}>Бонусов</span>
                        <span className={cl.detailInfoRow}>{bonuses}</span>
                    </div>
                </div>

                <div className={cl.infoBlock}>
                    <GrayLoyalLevel/>
                    <div className={cl.infoRow}>
                        <span className={cl.nameInfoRow}>Уровень лояльности</span>
                        <span className={cl.detailInfoRow}>Любитель</span>
                    </div>
                </div>

                <div className={cl.infoBlock}>
                    <GrayOrders/>
                    <div className={cl.infoRow}>
                        <span className={cl.nameInfoRow}>Заказов</span>
                        <span className={cl.detailInfoRow}>0</span>
                    </div>
                </div>


            </div>
        </div>
    );
};
