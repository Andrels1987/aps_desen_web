// 'use client'
import { createContext, useEffect, useState } from "react";
import app from "../../firebase.config";
import {
    getDatabase,
    ref,
    onValue
} from "firebase/database";


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