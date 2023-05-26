import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import GameProvider from "./context/GameContext"
import GlobalStorage from './context/GlobalContext'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalStorage>
      <GameProvider>
        <Component {...pageProps} />
      </GameProvider>
    </GlobalStorage>
    
  )
}
