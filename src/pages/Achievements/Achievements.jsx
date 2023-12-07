import cl from './Achievements.module.css'
import level1 from '../../assets/unlock/UnLockLevel1.png'
import {BlockAchive} from "./BlockAchive/BlockAchive";


const listAchive = [
    {nameLevel: 'Любитель', listAchive: [{numberParty: 1, unlock: true}, {numberParty: 2, unlock: true}, {numberParty: 3, unlock: true}]},
    {nameLevel: 'Знаток', listAchive: [{numberParty: 1, unlock: true}, {numberParty: 2, unlock: true}, {numberParty: 3, unlock: true}]},
    {nameLevel: 'Знаток', listAchive: [{numberParty: 1, unlock: true}, {numberParty: 2, unlock: true}, {numberParty: 3, unlock: false}]},
]

//unlock добавил, чтобы проверить на заблокированность ачивки

export const Achievements = () => {
    return (
        <div className={cl.achievements}>
            <header className={cl.header}>
                <span>Достижения</span>
            </header>
            <main className={cl.mainContent}>
                {
                    listAchive.map((data, index) => {
                        return <BlockAchive nameLevel={data.nameLevel} listAchive={data.listAchive} key={index}/>
                    })
                }

            </main>
        </div>
    );
};

