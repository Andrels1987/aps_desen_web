// 'use client'
import{ createContext, useState } from "react";

const QuestionsAndAnswers = [
    {id:1,question:'what is next js',rightAnswer: 'is a React framework that gives you building blocks to create web applications', answers: [{id:1,answer:'is a React framework that gives you building blocks to create web applications'},{id:2, answer: 'É o mesmo que HTML.'},{id:3, answer:'Linguagem de estilização do HTML'}]},
    {id:2,question:'what is react js',rightAnswer: 'is an open-source JavaScript framework and library developed by Facebook', answers: [{id:1,answer:'Linguagem de programação'},{id:2, answer: 'is an open-source JavaScript framework and library developed by Facebook'},{id:3, answer:'Padrão de projeto'}]},
    {id:3,question:'what is angular js',rightAnswer: 'is a structural framework for dynamic web apps.', answers: [{id:1,answer:'Termo usado para descrever um Website'},{id:2, answer: 'Semelhante ao java, só que mais leve'},{id:3, answer:' is a structural framework for dynamic web apps.'}]},
    {id:4,question:'what is solid js',rightAnswer: 'is a JavaScript framework that supports binding data to elements that it then syncs and displays on web pages', answers: [{id:1,answer:'Codigo para compilar javascript'},{id:2, answer: 'is a JavaScript framework that supports binding data to elements that it then syncs and displays on web pages'},{id:3, answer:'Framework usado para criar REST APIs'}]},
]


export const GameContext = createContext();

const GameProvider = ({children}) => {
    const [QandA, setQandA] = useState(QuestionsAndAnswers)
    const [life, setLife] = useState(3)
    const [score, setScore] = useState(0)

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