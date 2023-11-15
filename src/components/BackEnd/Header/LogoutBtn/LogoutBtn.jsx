import style from './LogoutBtn.module.css'
import { useAuth } from '@/context/AuthContext'

const LogoutBtn = () => {
    const { logout } = useAuth()

    const handleLogout = () => {
        logout()
    }

    return (
        <div className={style.logoutWrapper}>
            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    )
}

export { LogoutBtn }