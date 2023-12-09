import cl from "./BlockAchive.module.css";
import level1 from "../../../assets/unlock/UnLockLevel1.png";
import {Achivka} from "./achivka/Achivka";

export const BlockAchive = ({nameLevel, parties, unLock}) => {
    return (
        <div>
            <div className={cl.blockAchiv}>

                {
                    unLock
                        ?
                        <span className={cl.unLock}>{nameLevel}</span>
                        :
                        <span className={cl.lock}>{nameLevel}</span>
                }

                <div className={cl.listAhiv}>

                    {
                        parties.map((data, index) => {
                            return <Achivka
                                numberParty={data.numberParty}
                                unlockAchieve={data.unlockAchieve}
                                key={index}
                            />
                        })
                    }

                </div>
            </div>
        </div>
    );
};

