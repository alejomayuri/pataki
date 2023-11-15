import { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '@/firebase/client';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        // Se debe cancelar la suscripción al desmontar el componente
        return () => unsubscribe();
    }, []);

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const logout = () => {
        return auth.signOut()
    }

    return (
        <AuthContext.Provider value={{ login, logout, currentUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}