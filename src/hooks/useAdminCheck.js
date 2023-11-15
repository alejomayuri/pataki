import { useAuth } from "@/context/AuthContext"
import { useEffect, useState } from 'react'
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"

export const useAdminCheck = () => {
    const IS_ADMIN_STATES = {
        LOADING: 'LOADING',
        ADMIN: 'ADMIN',
        NOT_ADMIN: 'NOT_ADMIN',
    }
    const [isAdmin, setIsAdmin] = useState(IS_ADMIN_STATES.LOADING);
    const { currentUser, loading } = useAuth();
    
    useEffect(() => {
        const checkUser = async () => {
            if (loading) {
                setIsAdmin(IS_ADMIN_STATES.LOADING);
            } else {
                if (currentUser) {
                    const userRef = firebase.firestore().collection('usuarios__administradores').doc(currentUser?.uid);
                    const doc = await userRef.get();

                    if (doc.exists && doc.data().admin) {
                        setIsAdmin(IS_ADMIN_STATES.ADMIN);
                    } else {
                        setIsAdmin(IS_ADMIN_STATES.NOT_ADMIN);
                    }
                } else {
                    setIsAdmin(IS_ADMIN_STATES.NOT_ADMIN);
                }
            }
        }

        checkUser();
    }, [currentUser, loading]);

    return isAdmin;
}

export default useAdminCheck;