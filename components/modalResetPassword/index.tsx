import { useContext, useRef, useState } from "react";
import { GlobalContext } from "@/pages/context/GlobalContext";

const ModalResetPassword = ( { setShowModalResetPassword }:any) => {
  const [email, setEmail] = useState("");
  const { auth, sendPasswordResetEmail } = useContext(GlobalContext);
  const messageElement = useRef() as React.MutableRefObject<HTMLInputElement>

  const handleChangeValue = ({ target }: any) => {
    setEmail(target.value);
  };

  const flashMessage = ( text:string ,color:string = "black")=>{
    messageElement.current.style.color = color
    messageElement.current.innerText = text
  }

  const handleClickResetPassword = () => {
    if( email ){
        sendPasswordResetEmail(auth, email)
            .then(( ) =>{
                flashMessage("Sucesso!!! Acesse seu email para redefinir a senha.","blue")
                setTimeout(()=>setShowModalResetPassword(false),3000)
            })
            .catch(( ) => flashMessage("Digite o email corretamente !!!","red"))
            .finally( ()=>setTimeout(( ) => flashMessage( "Digite o email que deseja redefinir a senha :"),3000))
    }
    
  };

  return (
    <div
      id="modalResetPassword"
      aria-hidden="true"
      className="flex items-center justify-center place-items-center bg-opacity-70 bg-black mx-auto fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative w-full max-w-2xl max-h-full">
        <div className="p-4 relative bg-white rounded-lg shadow dark:bg-gray-700 opacity-1">
          <div className="flex items-start justify-between rounded-t dark:border-gray-600">
            <h3 ref={ messageElement } className="text-xl font-semibold text-gray-900 dark:text-white">
              Digite o email que deseja redefinir a senha :
            </h3>
            <button onClick={()=>setShowModalResetPassword(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="modalResetPassword">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="relative w-80 pt-4">
            <input
              onChange={handleChangeValue}
              value={email}
              required
              autoComplete="off"
              id="email"
              name="email"
              type="email"
              className="border border-sky-400 rounded-lg peer placeholder-transparent h-10 w-full text-gray-900 focus:outline-none focus:border-sky-500"
              placeholder="Digite seu e-mail"
            />
            <label
              htmlFor="email"
              className="pt-4 absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Email
            </label>
          </div>
          <div className="flex items-center pr-6 py-6 space-x-2 rounded-b dark:border-gray-600">
            <button
              onClick={handleClickResetPassword}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalResetPassword;
