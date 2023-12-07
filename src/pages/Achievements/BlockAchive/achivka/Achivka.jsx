import cl from './Achivka.module.css'
import level1 from "../../../../assets/unlock/UnLockLevel1.png";
import lockLevel1 from '../../../../assets/lock/LockLevel1.png'
export const Achivka = ({numberParty, unlock}) => {
    return (
        <div className={cl.achivka}>

            {
                unlock
                ?
                    <img src={level1} alt={''} className={cl.imgAhive}/>
                    :
                    <img src={lockLevel1} alt={''} className={cl.imgAhive}/>
            }

            <span className={cl.numberAchive}> {numberParty} вечеринка</span>
        </div>
    );
};

