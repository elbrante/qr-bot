import cl from './ButtonShowQR.module.css'

export const ButtonShowQR = ({children, onClick}) => {
    return (
        <button className={cl.showButton} onClick={onClick}>
            <span className={cl.nameButton}>{children}</span>
        </button>
    );
};

