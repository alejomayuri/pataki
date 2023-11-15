import style from './Header.module.css';
import { LogoutBtn } from './LogoutBtn/LogoutBtn';

const Header = () => {
    return (
        <header className={style.header}>
            <div className={style.header__logoWrapper}>
                <div className={style.header__logo}>
                    <img src="/logo.png" alt="Logo" />
                </div>
                <div>
                    <p className={style.header__version}>v.1.0.0</p>
                </div>
            </div>
            <LogoutBtn />
        </header>
    )
}

export { Header }