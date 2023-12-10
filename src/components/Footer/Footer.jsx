import cl from './Footer.module.css'

export const Footer = () => {
    return (
        <footer className={cl.footer}>
            <span className={cl.text}>Сделано в</span>
            <a href={'https://thx-loyalty.com/'} className={cl.link}>Thx loyalty</a>
        </footer>
    );
};