import cl from "./BlockAchive.module.css";
import level1 from "../../../assets/unlock/UnLockLevel1.png";
import {Achivka} from "./achivka/Achivka";

export const BlockAchive = ({nameLevel, listAchive}) => {
    return (
        <div>
            <div className={cl.blockAchiv}>
                <span>{nameLevel}</span>
                <div className={cl.listAhiv}>

                    {
                        listAchive.map((data, index) => {
                            return <Achivka numberParty={data.numberParty} unlock={data.unlock} key={index}/>
                        })
                    }

                </div>
            </div>
        </div>
    );
};

