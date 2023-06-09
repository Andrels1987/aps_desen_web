'use client'
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import app from '../../firebase.config';
import {
    getDatabase,
    ref,
    set,
    child,
    get,
    remove,
    onValue
} from "firebase/database";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    signOut
} from "firebase/auth";

const auth = getAuth(app)

const database = getDatabase(app);

export const GlobalContext = createContext();

const GlobalStorage = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null)
    const [formSignIn, setFormSignIn] = useState({
        email: "",
        password: ""
    })
    const handleSignIn = () => {
        const { email, password } = formSignIn
        if (email && password) {
            signInWithEmailAndPassword(auth, email, password)
                .then((data) => {
                    setUser(data);
                    router.push('/game')
                })
                .catch(() => alert("email ou senha errado"))

            setFormSignIn({ email: "", password: "" })
            return
        }
        alert("Preencha todos os campos corretamente")
    }
    useEffect(() => {
        return auth.onAuthStateChanged((userlogged) => {
            setUser(userlogged)
            if(userlogged == null){
                router.push("/")
            }
        })
    }, [user])
    
    return (
        <GlobalContext.Provider
            value={{
                auth,
                createUserWithEmailAndPassword,
                signInWithEmailAndPassword,
                sendEmailVerification,
                sendPasswordResetEmail,
                signOut,
                ref,
                set,
                get,
                onValue,
                remove,
                child,
                user,
                setUser,
                database,
                handleSignIn,
                formSignIn,
                setFormSignIn
            }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalStorage;
