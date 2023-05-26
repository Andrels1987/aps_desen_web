import Link from "next/link"
import { useRouter } from "next/router";
import { GlobalContext } from "@/pages/context/GlobalContext"
import { useContext } from "react"
import Image from "next/image";
import whatsappIcon from "../../public/whatsapp-icon.png";

const Header = ( ) => {
    const router = useRouter()
    const { auth, signOut } = useContext( GlobalContext )
    const handleClickSignOut = ( ) => {
        signOut(auth)
        router.push("/")
    }

    return(
        <header className="mx-auto sticky top-0 max-w-md flex w-full justify-between p-5 bg-blue-400 text-white font-bold shadow-md shadow-black">
            <Link className={`hover:text-slate-300 ${router.pathname === "/listadepresenca" && ' text-black'}`} href="/listadepresenca">Lista de Presença</Link>
            {/* <Link className={`hover:text-slate-300 ${router.pathname === "/uniformes" && ' text-black'}`} href="/listadepresenca">Uniformes</Link> */}
            {/* <Link className={`hover:text-slate-300 ${router.pathname === "/eventos" && ' text-black'}`} href="/listadepresenca">Eventos</Link> */}
            <Link target="_blank" href="https://chat.whatsapp.com/1DJyGLmv3In4eV0Tb6FZg9">
                <Image
                    className="shadow-md shadow-black rounded-full cursor-pointer"
                    src={whatsappIcon}
                    alt="ícone do whatsapp"
                    width={30}
                />
            </Link>
            <p onClick={ handleClickSignOut } className="hover:text-slate-300 cursor-pointer" >Sair</p>
        </header>
    )
}
export default Header