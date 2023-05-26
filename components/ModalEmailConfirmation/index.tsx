import {useRouter} from "next/router";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/pages/context/GlobalContext";

const ModalEmailConfirmation = ( ) => {
    const [email,setEmail] = useState("")
    const router = useRouter()
    const { auth } = useContext(GlobalContext)

    useEffect(( ) => {
        auth.currentUser && setEmail(auth.currentUser.email)
    },[ auth.currentUser ])

    return(
        <div id="modalEmailConfirmation"  className="flex place-items-center bg-opacity-70 bg-black mx-auto fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 opacity-1">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Um email foi enviado para: { email }
                        </h3>
                    </div>
                    <div className="p-6 space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Confirme seu e-mail em { email } para ter acesso a todas as funcionalidades do aplicativo da Pelada do SÓ GELO !
                        </p>
                    </div>
                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button onClick={( ) => router.push("/")} data-modal-hide="modalEmailConfirmation" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ir para a página principal</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalEmailConfirmation;