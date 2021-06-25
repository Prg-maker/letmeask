import {useHistory, useParams} from "react-router-dom"

import { RoomCode } from "../components/RoomCode"
import { database } from "../services/firebase"

import LogoImg  from "../assets/images/logo.svg"
import deleteImg from "../assets/images/delete.svg"


import { Button } from "../components/Button"



import '../styles/room.scss'
import { Questions } from "../components/Question"
import { useRoom } from "../hooks/useRoom"


type RoomParmas = {
    id: string
}





export function AdiminRoom() {
    //const {user} = useAuth()
    const params = useParams<RoomParmas>()

  
    const history = useHistory()
    const roomId = params.id

    async function handleEndRoom () {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),

        })


        history.push('/')
    } 

    const {questios, title} = useRoom(roomId)
    async function handleDeleteQuestions(questionId: string){

        if(window.confirm('Tem certeza que vocÊ deseja excluir essa pergunta')){
            const questionRef = await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }



    


   
     
    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={LogoImg} alt="LetMeAsk" />

                    <div>
                        <RoomCode code={roomId}/>
                        <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
                    </div>
                    
                </div>

            </header>

            <main >
                <div className="rom-title">
                    <h1>Sala {title}</h1>
                     {questios.length > 0 && <span>{questios.length} pergunta(s)</span> }
                </div>


              
                <div className="question-list">
                    {questios.map(question =>{
                        return(
                            <Questions key={question.id} content={question.content} author={question.author}>
                                <button type="button" onClick={() => handleDeleteQuestions(question.id)}>
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                            </Questions>

                        )
                    })}


                </div>
            </main>
        </div>
    )
}