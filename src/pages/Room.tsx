import {useParams} from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { FormEvent, useState } from "react"

import { RoomCode } from "../components/RoomCode"

import LogoImg  from "../assets/images/logo.svg"


import { Button } from "../components/Button"



import '../styles/room.scss'
import { __String } from "typescript"
import { database } from "../services/firebase"
import { useEffect } from "react"


type RoomParmas = {
    id: string
}

type FirebaseQuestions = Record<string, {
    author:{
        name:string
        avatar: string
    }
    content: string
    isAnswered: boolean
    isHighligted: boolean
}>

type Questions = {
    id: string
    author:{
        name:string
        avatar: string
    }
    content: string,
    isAnswered: boolean
    isHighligted: boolean
}

export function Room() {
    const {user} = useAuth()
    const params = useParams<RoomParmas>()

    const [newQuestion, setNewQuestion] = useState('')


    const roomId = params.id
    const [questios, setQuestions] = useState<Questions[]>([])
    const [title , setTitle] = useState('')



    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`)

        roomRef.on('value', room =>{
            const databaseRoom  = room.val()
            const FirebaseQuestions: FirebaseQuestions = databaseRoom.questions 

            const parsedQuestions = Object.entries(FirebaseQuestions).map(([key , value]) =>{
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighligted: value.isHighligted,
                    isAnswered: value.isAnswered

                }
            })

            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
        })
    }, [roomId])


    async function handleSendQuenstion(event: FormEvent){
        event.preventDefault()

        if(newQuestion.trim() === ""){
            return
        }
        
        if(!user){
            throw new Error('You must logged in')
        }

        const question = {
            content: newQuestion,
            author:{
                name: user.name,
                avatar: user.avatar,

            },
            isHighligted: false,
            isAnswere: false
        }


        await database.ref(`rooms/${roomId}/questions`).push(question) 

        setNewQuestion('')
    }
     
    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={LogoImg} alt="LetMeAsk" />
                    <RoomCode code={roomId}/>
                </div>

            </header>

            <main >
                <div className="rom-title">
                    <h1>Sala {title}</h1>
                     {questios.length > 0 && <span>{questios.length} pergunta(s)</span> }
                </div>


                <form onSubmit={handleSendQuenstion}>
                    <textarea placeholder="O quer você quer perguntar" onChange={ event => setNewQuestion(event.target.value)} value={newQuestion}/>

                    <div className="form-footer">
                        {user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ): (
                            <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
                        )}
                        <Button disabled={!user} type="submit">
                        Enviar pergunta
                        </Button>
                   
                    </div>
                   
                </form>
                {JSON.stringify(questios)}
            </main>
        </div>
    )
}