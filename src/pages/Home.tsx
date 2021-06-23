import {useHistory} from "react-router-dom"
import { useContext } from "react"


import { AuthContext } from "../context/AuthContext"
import { useAuth } from "../hooks/useAuth"

import illustrationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"
import googleIconImg from "../assets/images/google-icon.svg"


import { Button } from "../components/Button"


import '../styles/auth.scss'

//webpack
// Module Bundler

export function Home(){
    const history = useHistory()
    const { user ,singWithGoogle } = useAuth()

  
    async function handleCreateRoom(){

        if(!user){
            await singWithGoogle()
        }
        history.push('/rooms/new')
    } 


    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustraçao simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo da Google" />
                        Crie sua sala com o google
                    </button>
                    <div className="separetor">ou entre em uma sala</div>
                    <form action="">
                        <input type="text" placeholder="Digite o código da sala" />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}