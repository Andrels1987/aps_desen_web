// 'use client'

import { GameContext } from "../context/GameContext"
import { useRouter } from "next/router";
import { GlobalContext } from "@/pages/context/GlobalContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState, useEffect } from "react";



const Home = () => {
  const router = useRouter();
  const { life, QandA, setLife, score, setScore } = useContext(GameContext);
  const { user } = useContext(GlobalContext);


  const [item, setItem] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");

  const { auth, signOut, setUser } = useContext(GlobalContext);

  const handleClickSignOut = () => {
    signOut(auth)   
  }

  useEffect(() => {
    const handleWindow = () => {
      window.addEventListener('resize', () => {
        let menu = document.querySelector("#mobile-menu")! as HTMLElement;
        if (menu != null) {
          let width = window.innerWidth;
          if (width > 640) {
            menu.style.display = "none";
          }
        }
      });
    }
    handleWindow();
    return () => window.removeEventListener("resize", handleWindow);
  }, [user])
  //
  const openMenu = () => {
    let menu = document.querySelector("#mobile-menu")! as HTMLElement;
    let menuAtrr = getComputedStyle(menu);
    //console.log(menuAtrr.display);
    menuAtrr.display == "none"
      ? (menu.style.display = "block")
      : (menu.style.display = "none");
  };
  //compara a resposta do usuario com a resposta correta
  const checkAnswer = function () {
    let rightAnswer = QandA[item].rightAnswer;
    if (userAnswer == rightAnswer) {
      console.log("Answer is correct");
      setScore((score: number) => score + 10);
    } else {
      setLife((life: any) => life - 1);
    }
    setItem(item => item + 1);
    let answer = document.querySelectorAll<HTMLElement>('.answers');
    answer.forEach(element => {
      let styles = getComputedStyle(element, "::after");
      element.style.setProperty('--largura', '5px')
    });
  };

  //insere os icones de vida no header - CORAÇÕES
  const setLifes = (level: any) => {
    let content = [];
    for (let i = 0; i < level; i++) {
      content.push(<FontAwesomeIcon key={i} className="faicons" icon={faHeart} />);
    }
    return content;
  };

  //close menu click
  const closeMenuClick = () => {
    let menu = document.querySelector("#mobile-menu")! as HTMLElement;
    menu.style.display = "none";
  }

  //esconder menu
  const handleUserAnswer = (event: any) => {
    let answer = document.querySelectorAll<HTMLElement>('.answers');
    answer.forEach(element => {
      let styles = getComputedStyle(element, "::after");
      element.style.setProperty('--largura', '5px')
    });

    let target = event.target;
    let styles = getComputedStyle(target, "::after");
    target.style.setProperty('--largura', '100%')

    setUserAnswer(target.innerText);
  }

  let content = null;
  if (user == null) {
    content = <div>Carregando...</div>
  } else {
    content = <div><div className="score">{score}</div>
      <div
        onClick={closeMenuClick}
        style={{
          height: "100vh",
          background: "#F9F3BC",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {life > 0 ? (
          QandA.length == 0 ? (
            <div style={{
              height: "50%",
              width: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#F3DB97",
              position: "absolute",
              fontSize: "2rem",
              top: "25%",
              color: "green"
            }}>CARREGANDO PERGUNTAS</div>
          ) : (
            item < QandA.length ? (
              <div
                className="max-w-sm rounded overflow-hidden shadow-lg "
                style={{
                  height: "70%",
                  width: "93%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#FFFFFF",
                  position: "absolute",
                  top: "15%",
                  zIndex: "1"
                }}
              >
                <div className="px-6 py-4">
                  <div className="font-bold  mb-1 text-green-500 text-4xl question">
                    {QandA[item].question} ?
                  </div>
                  <div className="font-bold text-xl mb-2 ">
                    {QandA[item].answers.map((a: any) =>
                    (
                      <div key={a.id} className="answers" onClick={(ev) => handleUserAnswer(ev)}>
                        <p
                          className="text-gray-700 text-base py-4"
                          style={{ padding: "0" }}
                        >
                          {a.answer}
                        </p>
                      </div>
                    )
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  height: "50%",
                  width: "90%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#F3DB97",
                  position: "absolute",
                  top: "25%",
                }}
                className="max-w-sm rounded overflow-hidden shadow-lg"
              >
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 text-yellow-600">
                    <h1>PERGUNTAS FINALIZADAS</h1>
                  </div>
                </div>
              </div>
            )
          )) : (
          <div
            style={{
              height: "50%",
              width: "90%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#F3DB97",
              position: "absolute",
              top: "25%",
            }}
            className="max-w-sm rounded overflow-hidden shadow-lg"
          >
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-yellow-600">
                <h1>Sem vidas</h1>
              </div>
            </div>
          </div>
        )}
        {life != 0 ? (
          <button
            style={{
              position: "absolute",
              top: "88%",
            }}
            onClick={checkAnswer}
            className={`${QandA.length == item ? "disabled bg-gray-500" : "bg-blue-500 "} text-white font-bold py-2 px-4 rounded-full `}
          >Responder
          </button>
        ) : (<button
          style={{
            position: "absolute",
            top: "88%",
          }}
          onClick={() => window.location.reload()}
          className={`${QandA.length == item ? "disabled bg-gray-500" : "bg-blue-500 "} text-white font-bold py-2 px-4 rounded-full `}
        >Recomeçar
        </button>)}
      </div></div>
  }
  return (
    <>
      <nav className="bg-gray-800 z-10-relative ">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                onClick={openMenu}
                type="button"
                id="openMenu"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >

                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:ml-6 sm:block">
                <div className="  flex space-x-4">
                  <a
                    href="#"
                    className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                    aria-current="page"
                  >
                    Dashboard
                  </a>

                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <div>{setLifes(life)}</div>
              </button>

              <div className="relative ml-3">
                <div>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-white"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-2"
                    onClick={handleClickSignOut}
                  >
                    Sair
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="menu" id="mobile-menu">
          <div className=" space-y-1 px-2 pb-3 pt-2">
            <a
              href="#"
              className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
              aria-current="page"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Team
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Projects
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Calendar
            </a>
          </div>
        </div>
      </nav>
      {content}
    </>
  );
}

export default Home;