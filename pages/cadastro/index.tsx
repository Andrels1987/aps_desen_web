import { useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.png"
import { GlobalContext } from "../context/GlobalContext.js";
import ModalEmailConfirmation from "../../components/ModalEmailConfirmation";

const Cadastro = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formRegister, setFormRegister] = useState({
    name: "",
    email: "",
    password: "",
  });
  const {
    auth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    database,
    set,
    ref,
  } = useContext(GlobalContext);

  const handleChangeValue = ({ target }: any) => {
    setFormRegister((old) => {
      return { ...old, [target.name]: target.value };
    });
  };
  
  const handleClick = () => {
    const { name, email, password } = formRegister;

    if (name && email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((data: any) => {
          set(ref(database,`users/${auth.currentUser.uid}`),formRegister)
          setFormRegister({ name: "", email: "", password: "" });
          sendEmailVerification(auth.currentUser)
            .then((a: any) => {
              setShowModal(true);
            })
            .catch((e: any) => console.log("e", e));
        })
        .catch((err: any) => console.log("err", err));

      return;
    }
    alert("Preencha todos os campos corretamente");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      {showModal && <ModalEmailConfirmation />}
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transhtmlForm -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <Image
            priority
            className="mx-auto"
            width={300}
            height={300}
            alt="bola de futebol"
            src={logo}
          />
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-center">
                Cadastro do SÓ GELO
              </h1>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  {/* <div className="relative">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor="file_input">Adicionar Foto de Perfil</label>
                                    <input 
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        id="file_input"
                                        type="file"
                                    />
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                                </div> */}
                  <div className="relative">
                    <input
                      onChange={handleChangeValue}
                      value={formRegister.name}
                      required
                      autoComplete="off"
                      id="name"
                      name="name"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Digite seu nome ou apelido"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Nome ou Apelido
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      onChange={handleChangeValue}
                      value={formRegister.email}
                      required
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="email"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Digite seu e-mail"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      onChange={handleChangeValue}
                      value={formRegister.password}
                      required
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Digite sua senha"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Senha
                    </label>
                  </div>
                  <div className="relative">
                    <button
                      className="bg-blue-500 text-white rounded-md px-2 py-1 w-full"
                      onClick={handleClick}
                    >
                      Cadastrar
                    </button>
                  </div>
                  <div className="register">
                    <Link href="/">Já possui conta? Fazer login</Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
