import { useState } from "react"
import { useAuth } from "@/context/AuthContext"

export const useLogin = () => {
    const { login } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)

    const handleLogin = (e) => {
        e.preventDefault()
        setLoading(true)
        login(email, password)
            .then(() => {
                setLoading(false)
            })
            .catch((error) => {
                setError(error.message)
                setLoading(false)
            })
    }

    //La función de registrarce con google va aquí pero aún no la voy a crear
    return {
        error, loading, handleEmail, handlePassword, handleLogin
    }
}
