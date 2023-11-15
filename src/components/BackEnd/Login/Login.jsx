import style from './Login.module.css'
import { useLogin } from "@/hooks/useLogin"

const LoginForm = () => {
    const {
        error,
        loading,
        handleEmail,
        handlePassword,
        handleLogin,
    } = useLogin();
    
    return (
        <div className={style.container}>
            {error && <p>{error}</p>}
            <form className={style.form} onSubmit={handleLogin}>
                <div className={style.formContainer}>
                    <h1 className={style.h1}>Iniciar sesión</h1>
                    <div>
                        <label htmlFor="email" className={style.lable}>Email</label>
                        <input required type="email" name="email" onChange={handleEmail} className={style.input}/>
                    </div>
                    <div>
                        <label htmlFor="password" className={style.lable}>Password</label>
                        <input required type="password" name="password" onChange={handlePassword} className={style.input}/>
                    </div>
                    <button className={style.submitButton} type="submit">
                        {loading ? 'Loading...' : 'Ingresar'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export { LoginForm }
