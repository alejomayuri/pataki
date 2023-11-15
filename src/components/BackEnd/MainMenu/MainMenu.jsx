import style from './MainMenu.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

const MainMenu = () => {
    const router = useRouter()
    const { pathname } = router
    const actualPath = pathname.split('/')[2]

    return (
        <div className={style.mainMenu}>
            <ul>
                <li className={style.menu__item}>
                    <Link href="/backend" className={style.menu__link}>
                        <span>🏠</span>
                        <p>Inicio</p>
                    </Link>
                </li>
                <li className={`
                    ${style.menu__item}
                    ${actualPath === 'products' ? style.menu__item__active : ''}
                `}>
                    <Link href="/backend/products" className={style.menu__link}>
                        <span>🛍️</span>
                        <p>Productos</p>
                    </Link>
                </li>
                <li className={`
                    ${style.submenu__item} 
                    ${(actualPath === 'products') && style.submenu__item__active}
                    ${(actualPath === 'products' || actualPath === 'colections' || actualPath === 'create-product') && style.submenu__item__show}
                `}>
                    <Link href="/backend/products" className={style.menu__link}>
                        <p>Todos los productos</p>
                    </Link>
                </li>
                <li className={`
                    ${style.submenu__item} 
                    ${(actualPath === 'create-product') && style.submenu__item__active}
                    ${(actualPath === 'products' || actualPath === 'colections' || actualPath === 'create-product') && style.submenu__item__show}
                `}>
                    <Link href="/backend/create-product" className={style.menu__link}>
                        <p>Crear productos</p>
                    </Link>
                </li>
                <li className={`
                    ${style.submenu__item} 
                    ${actualPath === 'colections' && style.submenu__item__active}
                    ${(actualPath === 'products' || actualPath === 'colections' || actualPath === 'create-product') && style.submenu__item__show}
                `}>
                    <Link href="/backend/colections" className={style.menu__link}>
                        <p>Colecciones</p>
                    </Link>
                </li>
                <li className={`
                    ${style.menu__item}
                    ${actualPath === 'orders' ? style.menu__item__active : ''}
                `}>
                    <Link href="/backend/orders" className={style.menu__link}>
                        <span>📦</span>
                        <p>Pedidos</p>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export { MainMenu }