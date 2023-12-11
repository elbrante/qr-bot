import cl from './Achievements.module.css'
import level1 from '../../assets/unlock/UnLockLevel1.png'
import {BlockAchive} from "./BlockAchive/BlockAchive";
import {useEffect, useState} from "react";
import {getListAchive} from "../../api/api";


//unlock добавил, чтобы проверить на заблокированность ачивки

export const Achievements = () => {
    const [listAchive, setListAchive] = useState([])

    useEffect(() => {
        getListAchive().then(res => {
            setListAchive(res.data)
            console.log(res.data)
        })
    }, []);


    return (
        <div className={cl.achievements}>
            <header className={cl.header}>
                <span>Достижения</span>
            </header>
            <main className={cl.mainContent}>
                {
                    listAchive.map((data, index) => {
                        return <BlockAchive
                            nameLevel={data.nameLevel}
                            parties={data.parties}
                            unLock={data.unLock}
                            key={index}

                        />
                    })
                }

            </main>
        </div>
    );
};

