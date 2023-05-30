'use client'
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { initializeApp } from "firebase/app";
import { getDatabase,
        ref,
        set,
        child,
        get,
        remove,
        onValue} from "firebase/database";
import { getAuth,
         createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
         sendEmailVerification,
         sendPasswordResetEmail,
         signOut} from "firebase/auth";

export const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const database = getDatabase(app);



export const GlobalContext = createContext();

const GlobalStorage = ({children})=>{
    const router = useRouter();
    const [formSignIn, setFormSignIn] = useState({
        email:"",
        password:""
    })
    const [user, setUser] = useState(null)
    const handleSignIn = ( ) => {
        const {email, password} = formSignIn
    
        if(email && password){
    
            signInWithEmailAndPassword(auth, email, password)
                .then((data) =>{
                    console.log("DATA: ", data);
                    setUser(data);
                    data && router.push('/game')
                })
                .catch(( )=> alert("email ou senha errado"))
    
            setFormSignIn({email:"",password:""})
    
            return
        }
            alert("Preencha todos os campos corretamente")
    }
    useEffect(()=>{
        return auth.onAuthStateChanged(( userlogged ) => {        
            console.log("user: ", userlogged); 
            setUser(userlogged)           
            user != null && router.push("/game")
        })
    },[])
    return(
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
                database,
                handleSignIn,
                formSignIn, 
                setFormSignIn}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalStorage;
