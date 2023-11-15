import style from './Home.module.css';

const HomeBackEnd = () => {
    return (
        <div className={style.info__wrapper}>
            <div className={style.alertBlue}>
                <h2 className={style.alert__title}>Primera versión de PAtAKI</h2>
                <p className={style.alert__content}>Esta es la primera versión de PAtAKI, servicio de generación modular de Ecommerce. Aún en desarrollo.</p>
            </div>
        </div>
    );
}

export { HomeBackEnd };