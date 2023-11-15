import style from './PageTitle.module.css'

const PageTitle = ({ title, children }) => {
    return (
        <div className={style.pageTitle}>
            {children}
            <h1>{title}</h1>
        </div>
    )
}

export { PageTitle }