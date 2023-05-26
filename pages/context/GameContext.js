// 'use client'
import { createContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
    getDatabase,
    ref,
    set,
    child,
    get,
    remove,
    onValue
} from "firebase/database";

/* const QuestionsAndAnswers = [
    {Qid:1,question:'what is next js',rightAnswer: 'is a React framework that gives you building blocks to create web applications', answers: [{id:1,answer:'is a React framework that gives you building blocks to create web applications'},{id:2, answer: 'É o mesmo que HTML.'},{id:3, answer:'Linguagem de estilização do HTML'}]},
    {Qid:2,question:'what is react js',rightAnswer: 'is an open-source JavaScript framework and library developed by Facebook', answers: [{id:1,answer:'Linguagem de programação'},{id:2, answer: 'is an open-source JavaScript framework and library developed by Facebook'},{id:3, answer:'Padrão de projeto'}]},
    {Qid:3,question:'what is angular js',rightAnswer: 'is a structural framework for dynamic web apps.', answers: [{id:1,answer:'Termo usado para descrever um Website'},{id:2, answer: 'Semelhante ao java, só que mais leve'},{id:3, answer:' is a structural framework for dynamic web apps.'}]},
    {Qid:4,question:'what is solid js',rightAnswer: 'is a JavaScript framework that supports binding data to elements that it then syncs and displays on web pages', answers: [{id:1,answer:'Codigo para compilar javascript'},{id:2, answer: 'is a JavaScript framework that supports binding data to elements that it then syncs and displays on web pages'},{id:3, answer:'Framework usado para criar REST APIs'}]},
] */


import { getAuth,
     createUserWithEmailAndPassword,
     signInWithEmailAndPassword,
     sendEmailVerification,
     sendPasswordResetEmail,
     signOut} from "firebase/auth";

const firebaseConfig = {
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




export const GameContext = createContext();

const GameProvider = ({ children }) => {
    const [QandA, setQandA] = useState([])
    const [life, setLife] = useState(3)
    const [score, setScore] = useState(0)

   
useEffect(() => {
    
    const data = []    
    const db = getDatabase(app);
        const postListRef =  ref(db, 'questions');
        onValue(postListRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                let q = {
                    Qid: 1,
                    question: childData.question,
                    rightAnswer: childData.rightAnswer,
                    answers: childData.answers
                }
                data.push(q)                
                setQandA([...data])
            });
        }, {
            onlyOnce: true
        });

  
}, [])

    
    

    return (
        <GameContext.Provider value={{
            life,
            QandA,
            setQandA,
            setLife,
            score,
            setScore
        }}>

            {children}
        </GameContext.Provider>
    )
}

export default GameProvider;