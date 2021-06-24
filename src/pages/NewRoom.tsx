
import {FormEvent, useState} from 'react'
import {Link, useHistory} from "react-router-dom"
import { database } from '../services/firebase'



import illustrationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"
import googleIconImg from "../assets/images/google-icon.svg"

import { Button } from "../components/Button"
import { useAuth } from "../hooks/useAuth"



import '../styles/auth.scss'
import { useEffect } from 'react'
//import { useContext } from "react"
//import { AuthContext } from "../context/AuthContext"

//webpack
// Module Bundler



export function NewRoom(){

    const [newRoom , setNewRoom] = useState('')
    const {user} = useAuth()
    const history = useHistory()


    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault()

        if(newRoom.trim() === ''){
            return;
        }

        const roomRef = database.ref('rooms')


        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })


        history.push(`/rooms/${firebaseRoom.key}`)
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
                    <h2>Cria uma nova sala</h2>



                    <form onSubmit={handleCreateRoom}>
                        <input type="text" placeholder="Nome da sala" onChange={event => setNewRoom(event.target.value)} value={newRoom}/>
                        <Button type="submit">Criar sala</Button>
                    </form>



                    <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}