import { createContext } from "react";
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

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const database = getDatabase(app);

export const GlobalContext = createContext();

export const GlobalStorage = ({children})=>{
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
                database}}>
            {children}
        </GlobalContext.Provider>
    )
}
