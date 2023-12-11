import React from 'react';
import cl from './Account.module.css'
import photo from '../../assets/photo.png'
import dot from '../../assets/dot.png'
import vec from '../../assets/Vector.png'
import { useTelegram } from '../../hooks/useTelegram';
import { useState, useEffect } from 'react';
import axios from 'axios';

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

    return (
        <div className={cl.wrapperAccount}>
            <div className={cl.firstBlock}>
                {/* <img src={photo}/> */}
                {profPic}
                <div className={cl.nameInfo}>
                    <span className={cl.nameUser}>{user?.first_name}</span>
                    <div className={cl.phoneId}>
                        <span>ID: {user?.id}</span>
                    </div>
                </div>
            </div>
            <div className={cl.detailInfo}>
                <div className={cl.infoBlock}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.2283 15.3335L15.8898 13.3892C15.6932 13.305 15.4787 13.2711 15.2657 13.2907C15.0528 13.3102 14.8481 13.3826 14.6701 13.5012C14.6521 13.5128 14.6349 13.5257 14.6187 13.5398L12.3512 15.4685C12.3276 15.4813 12.3015 15.4885 12.2747 15.4894C12.2479 15.4904 12.2213 15.4851 12.1969 15.474C10.7394 14.7705 9.22952 13.2698 8.52327 11.8325C8.51151 11.8085 8.5054 11.7821 8.5054 11.7554C8.5054 11.7286 8.51151 11.7022 8.52327 11.6782L10.4583 9.38222C10.4722 9.36523 10.4851 9.34745 10.4969 9.32895C10.6139 9.15033 10.6846 8.94538 10.7025 8.73261C10.7205 8.51984 10.6852 8.30594 10.5998 8.11024L8.6693 3.77906C8.55967 3.52338 8.37007 3.31016 8.12897 3.17139C7.88786 3.03262 7.60825 2.9758 7.33211 3.00944C6.13196 3.16722 5.03033 3.75659 4.23308 4.66743C3.43582 5.57826 2.99749 6.74823 3.00001 7.9587C3.00001 15.1498 8.85022 21 16.0413 21C17.2517 21.0023 18.4216 20.5639 19.3324 19.7667C20.2432 18.9695 20.8326 17.868 20.9906 16.6679C21.0241 16.393 20.9681 16.1147 20.8307 15.8743C20.6934 15.6338 20.4821 15.4442 20.2283 15.3335ZM16.0413 19.8979C9.45821 19.8979 4.10209 14.5418 4.10209 7.9587C4.09902 7.01636 4.43915 6.10513 5.05892 5.39527C5.6787 4.68541 6.53572 4.22548 7.46987 4.10142H7.49099C7.528 4.10211 7.56394 4.11396 7.59409 4.13543C7.62425 4.1569 7.64721 4.18698 7.65998 4.22173L9.5978 8.54831C9.60885 8.57237 9.61458 8.59853 9.61458 8.625C9.61458 8.65147 9.60885 8.67763 9.5978 8.70169L7.65906 11.0032C7.64459 11.0196 7.63139 11.0371 7.61957 11.0555C7.49825 11.2407 7.42681 11.4541 7.41217 11.6751C7.39753 11.896 7.44018 12.1169 7.53599 12.3165C8.35061 13.9843 10.0313 15.6521 11.7175 16.4668C11.9182 16.562 12.1403 16.6037 12.3619 16.5876C12.5835 16.5715 12.7972 16.4982 12.9821 16.3749C12.9996 16.363 13.017 16.3501 13.0335 16.3364L15.3002 14.4077C15.3225 14.3957 15.3473 14.3886 15.3726 14.387C15.398 14.3855 15.4234 14.3894 15.4471 14.3985L19.7865 16.3428C19.822 16.3579 19.8518 16.3837 19.8717 16.4167C19.8917 16.4497 19.9007 16.4881 19.8977 16.5265C19.7743 17.461 19.3148 18.3187 18.6051 18.9392C17.8953 19.5596 16.984 19.9004 16.0413 19.8979Z" fill="#037EE5"/>
                    </svg>
                    <div className={cl.infoRow}>
                        <span className={cl.nameInfoRow}>Номер телефона</span>
                        <span className={cl.detailInfoRow}>{phoneNum}</span>
                    </div>
                </div>

                <div className={cl.infoBlock}>

                    <img src={vec}/>
                    <div className={cl.infoRow}>
                        <span className={cl.nameInfoRow}>Бонусов</span>
                        <span className={cl.detailInfoRow}>{bonuses}</span>
                    </div>
                </div>


                <div className={cl.infoBlock}>
                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.0179 0C11.3585 0 9.90563 0.713571 9 1.91973C8.09437 0.713571 6.64152 0 4.98214 0C3.66125 0.00148881 2.39489 0.52687 1.46088 1.46088C0.52687 2.39489 0.00148881 3.66125 0 4.98214C0 10.6071 8.34027 15.1602 8.69545 15.3482C8.78906 15.3986 8.8937 15.4249 9 15.4249C9.1063 15.4249 9.21094 15.3986 9.30455 15.3482C9.65973 15.1602 18 10.6071 18 4.98214C17.9985 3.66125 17.4731 2.39489 16.5391 1.46088C15.6051 0.52687 14.3387 0.00148881 13.0179 0ZM9 14.0464C7.53268 13.1914 1.28571 9.29652 1.28571 4.98214C1.28699 4.00218 1.67684 3.06272 2.36978 2.36978C3.06272 1.67684 4.00218 1.28699 4.98214 1.28571C6.54509 1.28571 7.85732 2.11821 8.40536 3.45536C8.45379 3.57326 8.53618 3.67411 8.64206 3.74508C8.74794 3.81606 8.87253 3.85395 9 3.85395C9.12747 3.85395 9.25206 3.81606 9.35794 3.74508C9.46382 3.67411 9.54621 3.57326 9.59464 3.45536C10.1427 2.1158 11.4549 1.28571 13.0179 1.28571C13.9978 1.28699 14.9373 1.67684 15.6302 2.36978C16.3232 3.06272 16.713 4.00218 16.7143 4.98214C16.7143 9.29009 10.4657 13.1906 9 14.0464Z" fill="#037EE5"/>
                    </svg>
                    <div className={cl.infoRow}>
                        <span className={cl.nameInfoRow}>Уровень лояльности</span>
                        <span className={cl.detailInfoRow}>Любитель</span>
                    </div>
                </div>

                <div className={cl.infoBlock}>
                    <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.2 3.5H16.8C17.2758 3.5 17.5 3.80534 17.5 4V20C17.5 20.1947 17.2758 20.5 16.8 20.5H1.2C0.724171 20.5 0.5 20.1947 0.5 20V4C0.5 3.80534 0.724171 3.5 1.2 3.5Z" stroke="#037EE5" stroke-linejoin="round"/>
                        <path d="M6.5 1V4M12.5 1V4M3.5 8.5H13.5M3.5 12.5H11.5M3.5 16.5H9.5" stroke="#037EE5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div className={cl.infoRow}>
                        <span className={cl.nameInfoRow}>Заказов</span>
                        <span className={cl.detailInfoRow}>0</span>
                    </div>
                </div>


            </div>
        </div>
    );
};
