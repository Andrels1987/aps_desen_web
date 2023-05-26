import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import ModalResetPassword from "@/components/modalResetPassword";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png"
import { GlobalContext} from  "./context/GlobalContext.js"
const Login = ()=>{
    const [formSignIn, setFormSignIn] = useState({
        email:"",
        password:""
    })
    const [ showModalResetPassword, setShowModalResetPassword ] = useState(false)
    const router =  useRouter()
    const {auth, signInWithEmailAndPassword} = useContext(GlobalContext)

    const handleSignIn = ( ) => {
        const {email, password} = formSignIn

        if(email && password){

            signInWithEmailAndPassword(auth, email, password)
                .then((data: any) =>{
                    router.push('/game')
                })
                .catch(( )=> alert("email ou senha errado"))

            setFormSignIn({email:"",password:""})

            return
        }
            alert("Preencha todos os campos corretamente")
    }
    const handleChangeValue = ({target}:any)=> {
        setFormSignIn(old=>{ return {...old,[target.name]:target.value}})
    }

    useEffect(()=>{

        auth.onAuthStateChanged(( user:any) => {
            user && router.push("/game")
        })
    },[])

    return(
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            {showModalResetPassword && <ModalResetPassword setShowModalResetPassword={ setShowModalResetPassword } />}
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transhtmlForm -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <Image
                        className="mx-auto"
                        width={300}
                        height={300}
                        alt="imagem do logo" 
                        src={logo} 
                    />
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold text-center" >Login - Pelada do SÓ GELO</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative">
                                    <input
                                        onChange={ handleChangeValue }
                                        autoComplete="off"
                                        id="email" name="email"
                                        type="email"
                                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                        placeholder="Digite seu e-mail" />
                                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email</label>
                                </div>
                                <div className="relative">
                                    <input
                                        onChange={ handleChangeValue }
                                        autoComplete="off"
                                        id="password"
                                        name="password"
                                        type="password"
                                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                        placeholder="Digite sua senha" />
                                    <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Senha</label>
                                </div>
                                <div className="relative flex flex-row justify-between">
                                    <button onClick={handleSignIn} className="bg-blue-500 text-white rounded-md px-2 py-1">Entrar</button>
                                    <div className="cursor-pointer" onClick={()=>setShowModalResetPassword(!showModalResetPassword)}>
                                        Esqueceu a senha ?
                                    </div>
                                </div>
                                <div className="register">
                                    <Link href="/cadastro">
                                        Cadastre-se
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;