import cl from './Achivka.module.css'
import level1 from "../../../../assets/unlock/UnLockLevel1.png";
import lockLevel1 from '../../../../assets/lock/LockLevel1.png'
import {getSrcImg} from "../../../../api/api";
import {user_id} from "../../../../api/dataUser";
export const Achivka = ({numberParty, imgID, unlockAchieve}) => {

    return (
        <div className={cl.achivka}>

            {
                unlockAchieve
                ?
                    <img src={getSrcImg.unLock(imgID)} alt={''} className={cl.imgAhive}/>
                    :
                    <img src={getSrcImg.lock(imgID)} alt={''} className={cl.imgAhive}/>
            }

            <span className={cl.numberAchive}> {numberParty} вечеринка</span>
        </div>
    );
};

