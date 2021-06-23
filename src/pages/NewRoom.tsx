
import {Link} from "react-router-dom"

import illustrationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"
import googleIconImg from "../assets/images/google-icon.svg"

import { Button } from "../components/Button"
//import { useAuth } from "../hooks/useAuth"



import '../styles/auth.scss'
//import { useContext } from "react"
//import { AuthContext } from "../context/AuthContext"

//webpack
// Module Bundler

export function NewRoom(){


    //const {user} = useAuth()
    

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
                    <h2>Cria uma nova sala</h2>
                    <form action="">
                        <input type="text" placeholder="Nome da sala" />
                        <Button type="submit">Criar sala</Button>

                        
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}