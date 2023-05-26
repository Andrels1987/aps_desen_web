import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { GlobalStorage } from './context/GlobalContext'
import GameProvider from "./context/GameContext"
export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalStorage>
      <GameProvider>
        <Component {...pageProps} />
      </GameProvider>
    </GlobalStorage>
  )
}
