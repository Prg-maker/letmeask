import {useHistory, useParams} from "react-router-dom"

import { RoomCode } from "../components/RoomCode"
import { database } from "../services/firebase"

import LogoImg  from "../assets/images/logo.svg"
import deleteImg from "../assets/images/delete.svg"
import checkImg from "../assets/images/check.svg"
import answerImg from "../assets/images/answer.svg"


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
    const {questios, title} = useRoom(roomId)
    console.log(questios)

    async function handleEndRoom () {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),

        })


        history.push('/')
    } 

    async function handleDeleteQuestions(questionId: string){

        if(window.confirm('Tem certeza que vocÊ deseja excluir essa pergunta')){
            const questionRef = await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }



    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,

        })
    }


    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighligted: true,
        })
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
                        return(//answered
                            <Questions key={question.id} content={question.content} author={question.author} isAnswered={question.isAnswered} isHighligted={question.isHighligted}>

                                {!question.isAnswered && (
                                    <>
                                        <button type="button" onClick={() => handleCheckQuestionAsAnswered(question.id)}>
                                            <img src={checkImg} alt="Marca pergunta como respondida" />
                                        </button>

                                        <button type="button" onClick={() => handleHighlightQuestion(question.id)}>
                                            <img src={answerImg} alt="Dar destaque a pergunta" />
                                        </button>
                                    </>
                                )}   


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